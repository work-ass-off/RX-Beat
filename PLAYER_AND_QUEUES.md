# RX-Beat: как работает плеер и очереди

Документ описывает текущую реализацию плеера и очередей в проекте.

## 1) Центр управления

Основная логика находится в `PlayerStoreService`.

Сервис хранит:

- текущий трек;
- состояние воспроизведения;
- прогресс и громкость;
- набор очередей;
- активную очередь, по которой работают next/prev и правый сайдбар.

Файл: `src/app/services/store/player-store/player-store.service.ts`.

## 2) Какие очереди есть

В сторе есть 5 очередей:

- `queueOfPlayedTracks` — история/локальная очередь проигранных;
- `popularTracksQueue` — общий список треков (страница tracks без id);
- `albumQueue` — треки выбранного альбома;
- `artistQueue` — треки выбранного артиста;
- `playlistQueue` — треки выбранного плейлиста.

Также есть:

- `activeQueue` — имя активной очереди;
- `currentQueue` — вычисляемая текущая очередь по `activeQueue`;
- `currentTrackIndexInQueue` — индекс текущего трека внутри `currentQueue`.

Поддерживаемые значения `activeQueue`:

- `queueOfPlayedTracks`
- `popularTracksQueue`
- `albumQueue`
- `artistQueue`
- `playlistQueue`

## 3) Как выбирается активная очередь

Есть два способа:

- `changeQueueSelection(queueName)` — явный выбор очереди;
- методы `set*Queue(tracks, autoSelect)` — заполнение очереди + опциональное авто-переключение.

Если `autoSelect = true`, сервис сразу делает эту очередь активной.

После выбора выполняется `ensureCurrentTrackFromActiveQueue()`:

- если активная очередь пустая, ничего не меняется;
- если `currentTrack` отсутствует, берется первый трек из активной очереди;
- если `currentTrack` уже есть, он не перезаписывается.

## 4) Как запускается трек

`setTrack(track, options?)`:

1. ставит `currentTrack`;
2. сбрасывает локальное состояние трека (`isPlaying = false`, `trackCurrentTime = 0`);
3. при `addToHistory = true` добавляет трек в `queueOfPlayedTracks` (без дублей);
4. вызывает `audio.load()`;
5. при `autoplay = true` включает проигрывание (`isPlaying = true`) и снимает `isInitialLoading`.

`togglePlay()`:

- если это первое взаимодействие, снимает `isInitialLoading`;
- если нет текущего трека, завершает работу;
- иначе переключает play/pause;
- при паузе вызывает `audio.pause()`.

## 5) Кто реально управляет HTMLAudioElement

Сервис хранит состояние, а реальным `<audio>` управляет `PlayerComponent` через `effect`.

Что делает компонент:

- следит за `currentTrack` и `isPlaying`;
- вызывает `audio.play()` при старте;
- вызывает `audio.pause()` при паузе;
- ждет `canplay`, если трек еще не готов;
- сохраняет ссылку на DOM-аудио в `playerStoreService.audio`.

Файл: `src/app/components/shared/player/player.component.ts`.

## 6) Откуда очереди получают данные

Главная точка наполнения очередей — `TracksPageComponent`.

Файл: `src/app/components/pages/home-page/pages/tracks-page/tracks-page.component.ts`.

Логика:

- компонент читает route param `id`;
- дополнительно определяет контекст родительского маршрута (`albums`, `artists`, `playlists`);
- если `id` есть:
  - запрашивает `getDataById(id)`;
  - берет `entity.tracks`;
  - кладет треки в нужную очередь:
    - albums -> `setAlbumQueue(..., true)`
    - artists -> `setArtistQueue(..., true)`
    - playlists -> `setPlaylistQueue(..., true)`
- если `id` нет:
  - использует `data$`;
  - кладет треки в `setPopularTracksQueue(..., true)`.

Важно: страницы `albums` и `artists` сами очереди не заполняют, они показывают списки сущностей. Наполнение очереди происходит в дочернем маршруте с `TracksPageComponent`.

## 7) Next/Prev и activeQueue

Кнопки prev/next работают от активной очереди:

- `setPreviousTrackFromQueue()`;
- `setNextTrackFromQueue()`.

Обе функции используют:

- `currentQueue()`;
- `currentTrackIndexInQueue()`.

Если текущий трек не найден в активной очереди, индекс будет `-1`, и переход вперед/назад не выполнится.

## 8) Откуда пользователь запускает воспроизведение

- В списке треков (`app-track`) клик вызывает `setTrack(track)`.
- В правом сайдбаре (`track-item`):
  - если клик по текущему треку -> `togglePlay()`;
  - если по другому -> `setTrack(track, { autoplay: true, addToHistory: true })`.

## 9) Очередь истории и кнопка "Queue"

История (`queueOfPlayedTracks`) пополняется в `setTrack` при `addToHistory = true`.

Кнопка переключения на очередь в плеере (`toggleQueue`) делает:

- `setQueueOfPlayedTracks(queueOfPlayedTracks(), true)`.

То есть активной становится очередь истории.

## 10) Краткая схема

```mermaid
flowchart TD
    A[Route change or click] --> B{Есть id?}
    B -->|Нет| C[data$ -> popularTracksQueue]
    B -->|Да| D[getDataById(id) -> tracks]

    D --> E{Контекст route}
    E -->|albums| F[albumQueue]
    E -->|artists| G[artistQueue]
    E -->|playlists| H[playlistQueue]

    C --> I[activeQueue set]
    F --> I
    G --> I
    H --> I

    I --> J[ensureCurrentTrackFromActiveQueue]
    J --> K[currentTrack ready]
    K --> L[PlayerComponent effect -> play/pause]
```

## 11) Резюме

- Плеер опирается на один централизованный store-сервис.
- Все очереди сведены к модели "одна активная очередь".
- Источники данных определяются контекстом маршрута и `id`.
- DOM-аудио контролируется компонентом, а не сервисом.

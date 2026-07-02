# RX-Beat: как работает плеер и очереди треков

## 1) Общая идея

У тебя есть один центральный стор для плеера: `PlayerStoreService`.

Он хранит:
- текущий трек,
- состояние воспроизведения,
- прогресс/громкость,
- несколько очередей,
- активную очередь (какая сейчас считается основной для next/prev и правого сайдбара).

Главная точка правды: `src/app/services/store/player-store/player-store.service.ts`.

---

## 2) Какие очереди есть сейчас

В `PlayerStoreService`:

- `queueOfPlayedTracks: signal<Track[]>`
  - история проигранных (и стартовая локальная очередь по умолчанию)
- `albumQueue: signal<Track[] | null>`
  - треки выбранного альбома
- `popularTracksQueue: signal<Track[] | null>`
  - треки страницы `tracks`/artist (у тебя сейчас это общий контейнер для не-альбомной ленты)
- `activeQueue: signal<QueueName>`
  - одна активная очередь: `'queueOfPlayedTracks' | 'albumQueue' | 'popularTracksQueue'`

Вычисляемые:
- `currentQueue = computed(() => getQueueByName(activeQueue()))`
- флаги выбора очереди:
  - `isQueueOfPlayedTracksSelected`
  - `isAlbumQueueSelected`
  - `isPopularTracksQueueSelected`
- `currentTrackIndexInQueue`

Зачем это важно: теперь нет трех независимых boolean, которые могли конфликтовать. Выбор очереди централизован в `activeQueue`.

---

## 3) Инициализация плеера

При создании `PlayerStoreService`:
- `currentTrack` получает первый трек из `queueOfPlayedTracks`, если он есть.

Это делает кнопку Play доступной сразу (если в очереди есть трек).

---

## 4) Как работает воспроизведение

### 4.1 setTrack

`setTrack(track, options?)` делает:
1. обновляет `currentTrack`,
2. сбрасывает локальное состояние трека (`isPlaying = false`, `trackCurrentTime = 0`),
3. (опционально) добавляет трек в историю `queueOfPlayedTracks`,
4. вызывает `audio.load()`,
5. если `autoplay = true`, включает `isPlaying = true` и снимает `isInitialLoading`.

`options`:
- `autoplay` по умолчанию `true`,
- `addToHistory` по умолчанию `true`.

### 4.2 togglePlay

`togglePlay()`:
1. снимает `isInitialLoading` при первом взаимодействии,
2. если нет `currentTrack`, выхоит,
3. переключает `isPlaying`.
4. если переходим в pause — вызывает `audio.pause()`.

### 4.3 Кто реально вызывает HTMLAudioElement.play()

Это делает не сервис, а `PlayerComponent` через `effect`:
- следит за `currentTrack` + `isPlaying`,
- если нужно играть — вызывает `audio.play()` (с ожиданием `canplay`, если нужно),
- если нужно пауза — `audio.pause()`.

Файл: `src/app/components/shared/player/player.component.ts`.

Это хороший паттерн: сервис решает **что** должно играть, компонент управляет реальным DOM-аудио.

---

## 5) Как заполняются очереди данными

## 5.1 На странице tracks

Файл: `src/app/components/pages/home-page/pages/tracks-page/tracks-page.component.ts`

Поток `tracks$` смотрит route params:
- если `albumId`:
  - грузит `getAlbumWithTracks(albumId)`
  - вызывает `setAlbumQueue(tracks, true)`
- если `artistId`:
  - грузит `getArtistWithTracks(artistId)`
  - вызывает `setPopularTracksQueue(tracks, true)`
- иначе общий список tracks:
  - грузит `getTracks()`
  - вызывает `setPopularTracksQueue(tracks, true)`

`autoSelect = true` означает: эта очередь становится `activeQueue`.

## 5.2 На странице albums

Файл: `src/app/components/pages/home-page/pages/albums-page/albums-page.component.ts`

- По клику на альбом: dispatch `loadAlbumWithTracks({ albumId })`
- Из стора читаются треки альбома селектором `selectTracksByAlbumId(albumId)`
- Далее `setAlbumQueue(tracks, true)`

Таким образом альбомная очередь синхронизируется с NgRx и становится активной.

---

## 6) Как выбирается активная очередь

Методы:
- `changeQueueSelection(queueName)`
- `setAlbumQueue(tracks, autoSelect)`
- `setPopularTracksQueue(tracks, autoSelect)`

После смены активной очереди вызывается `ensureCurrentTrackFromActiveQueue()`.

Текущая логика `ensureCurrentTrackFromActiveQueue()`:
- если очередь пустая — ничего не делаем,
- если `currentTrack` отсутствует — берем первый трек из активной очереди без autoplay и без записи в history,
- если `currentTrack` уже есть — **не сбрасываем его** (это было важно для бага при переходе вкладок).

---

## 7) Next/Prev и связь с activeQueue

В `track-controls`:
- `prev`/`next` работают через `setPreviousTrackFromQueue()` / `setNextTrackFromQueue()`.

Обе функции используют:
- `currentQueue()` (то есть активную очередь),
- `currentTrackIndexInQueue()`.

Следствие:
- если текущий трек не входит в активную очередь, индекс будет `-1`, кнопки могут стать неактивными или вести себя “как будто трека нет в списке”.

Это ожидаемо при модели “одна активная очередь”.

---

## 8) Откуда пользователь запускает трек

### 8.1 Из списка треков

`src/app/components/shared/track/track.component.ts`
- клик по `app-track` => `setTrack(this.track())`

### 8.2 Из элемента очереди справа

`src/app/components/shared/track/track-item/track-item.component.ts`
- если это текущий трек: `togglePlay()`
- если другой трек: `setTrack(track, { autoplay: true, addToHistory: true })`

Это уже без двойного toggle (раньше была гонка, когда setTrack и потом ещё toggle запускались подряд).

### 8.3 Из track-card

`src/app/components/shared/track-card/track-card.component.ts`
- `setTrack(this.track())`

---

## 9) Почему раньше трек сбрасывался при переключении вкладок

Причина была в старой логике `ensureCurrentTrackFromActiveQueue()`:
- при смене `activeQueue` проверялось, есть ли текущий трек в новой очереди,
- если нет — ставился первый трек новой очереди.

Теперь это изменено:
- подмена происходит только когда `currentTrack === null`.

Итог:
- можно перейти из альбома на tracks, а играющий трек не потеряется.

---

## 10) Где может быть следующая точка улучшения

Сейчас `popularTracksQueue` используется и для "общих tracks", и для artist-контекста.

Для более чистой модели можно добавить:
- `artistQueue`,
- и расширить `QueueName` до 4 значений.

Это даст:
- более предсказуемый `activeQueue`,
- более прозрачный UI-индикатор текущего источника очереди,
- проще дебажить next/prev.

---

## 11) Быстрый сценарий жизненного цикла

```mermaid
flowchart TD
    A[Открыли страницу] --> B{Какой route?}
    B -->|albumId| C[Загрузка album tracks]
    B -->|artistId| D[Загрузка artist tracks]
    B -->|без params| E[Загрузка популярных tracks]

    C --> F[setAlbumQueue(tracks, true)]
    D --> G[setPopularTracksQueue(tracks, true)]
    E --> G

    F --> H[activeQueue=albumQueue]
    G --> I[activeQueue=popularTracksQueue]

    H --> J[ensureCurrentTrackFromActiveQueue]
    I --> J

    J -->|currentTrack есть| K[Оставить текущий трек]
    J -->|currentTrack null| L[Взять queue[0] без autoplay]

    M[Пользователь жмет Play] --> N[togglePlay]
    N --> O[isPlaying true/false]
    O --> P[PlayerComponent effect вызывает play/pause]
```

---

## 12) Короткое резюме

- Вся логика плеера централизована в `PlayerStoreService`.
- `activeQueue` — единый источник правды по текущей очереди.
- `setTrack` управляет выбором трека и autoplay.
- `PlayerComponent` управляет реальным `<audio>`.
- Переход между вкладками больше не должен сбрасывать играющий трек, если он уже выбран.

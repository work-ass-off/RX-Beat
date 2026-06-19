# Sprint 3 — 2026-06-19

- **What was done:** Developed a custom audio player featuring core playback controls (play/pause, next/previous) and a "favorites" system. Implemented dynamic volume management, a time-remaining indicator, and an interactive progress bar for manual track seeking. To ensure a robust implementation, researched HTML5 Audio Element states and advanced Angular Signals patterns, utilizing effects (with onCleanup), computed properties, and .update() methods to sync the state seamlessly. Additionally, built a custom pipe and reviewed the RxJS documentation—focusing on Observables, Subjects, and higher-order operators—to reinforce reactive programming best practices. Also I have daily meets mith my team and one meet with my mentor per week.
- **Problems:** Tracks from the queue would not consistently play upon a single "Play" click, and the player would intermittently shut down or stop responding.
- **Solutions:** For solving that issue I used for effect with that constaraction. List of problems this effect solves: Player freezing during rapid track changes (Race Condition): Prevents .play() from being called out of nowhere when Angular has already changed the track reference (src), but the browser hasn't yet initialized the new audio file. Memory Leaks: Thanks to onCleanup, the code promptly removes old 'canplay' event listeners if the user starts frantically clicking the "Forward" button before the tracks have time to load.Browser Sound Blocking (Autoplay Policy): Intercepts the error in built-in browser protection that prevents playback without a user click, preventing the app from crashing with a red error in the console. UI and Sound Desync (UI Desync): If the browser has blocked a track, the code immediately resets the isPlaying status to false. The on-screen button is guaranteed to return to the "Play" state, rather than getting stuck in an infinite pause/loader. 

```
  effect((onCleanup) => {
      const audioElement = this.audio()?.nativeElement;
      const track = this.track();
      const shouldPlay = this.playerStoreService.isPlaying();

      if (!audioElement || !track) {
        return;
      }

      if (!shouldPlay) {
        audioElement.pause();
        return;
      }

      const playAudio = (): void => {
        void audioElement.play().catch((error) => {
          console.error('Audio play() failed:', error);
          this.playerStoreService.isPlaying.set(false);
        });
      };

      if (audioElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        playAudio();
      } else {
        const onCanPlay = (): void => {
          playAudio();
        };

        audioElement.addEventListener('canplay', onCanPlay, { once: true });
        onCleanup(() => audioElement.removeEventListener('canplay', onCanPlay));
      }
    });
```

- **What I learned:**I learned how to work with effect, onCleanUp build0in Angular function, how to work with audio methods. Also I have repeated RxJS.
- **Plans:** Continue to develop custom player.
- **Time spent:** 42 hours.
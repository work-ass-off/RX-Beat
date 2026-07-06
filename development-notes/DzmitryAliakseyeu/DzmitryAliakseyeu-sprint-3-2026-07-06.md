# Sprint 3 — 2026-07-06

During sprint 4 I was focused on player state management.

When I set out to build the audio playback system for RX-Beat, my goal was to create a highly predictable, reactive, and centralized architecture using Angular. I wanted to avoid scattered state and ensure that queue management, history tracking, and DOM manipulation worked in perfect harmony.

Here is how I designed the system, the architecture I implemented, and the engineering challenges I had to solve along the way.

1. What I Developed (The Architecture)
I designed the core architecture around a single source of truth: the PlayerStoreService. This centralized store manages all playback states—current track, playback status (isPlaying), progress, volume, and the underlying queue structures.

### The Multi-Queue System
Instead of a single rigid playlist, I implemented five distinct queues to handle different user contexts:

- popularTracksQueue (General tracks)
- albumQueue, artistQueue, playlistQueue (Context-specific tracks)
- queueOfPlayedTracks (A duplicate-free local playback history)

I introduced an activeQueue pointer. Whichever queue name this pointer holds becomes the "master list" dynamically. This determines what the right sidebar displays and guides the setNextTrackFromQueue() and setPreviousTrackFromQueue() methods when calculating indices.

### Smart Route-Driven Hydration
To populate these queues, I built a smart context-detection mechanism inside the TracksPageComponent. By analyzing route parameters and parent contexts (/albums/:id vs /artists/:id), the component automatically fetches the correct data, populates the corresponding queue in the store, and auto-selects it as the activeQueue.

### Separation of Concerns (State vs. DOM)
I decoupled the business logic from browser APIs. The PlayerStoreService holds pure state, while the actual HTML <audio> element is managed entirely inside the PlayerComponent. To sync them, I utilized an Angular effect that watches state changes (like currentTrack or isPlaying) and imperatively calls .play() or .pause() on the DOM element.

2. The Technical Challenges & How I Solved Them
No project is without its roadblocks. During development, I faced three major synchronization and state issues:

- The "Lost Context" on Next/Prev Navigation
The Problem: Originally, if a user selected a track directly from a generic list, the player didn't know which list it belonged to. Pressing "Next" would fail or break because the track index in the active queue returned -1.

The Solution: I implemented the ensureCurrentTrackFromActiveQueue() fallback and tied queue selection directly to route hydration. Now, entering a page immediately binds the queue context. If a user clicks a track, the system safely calculates its position against that bound activeQueue.

- Race Conditions with Rapid Track Switching
The Problem: HTMLAudioElement operations are asynchronous. If a user rapidly spammed the "Next" button, .play() would sometimes be called before the previous file had finished loading (.load()), causing DOM exceptions and broken UI states.

The Solution: I integrated a loading state guard (isInitialLoading) and hooked into the native canplay browser event within the Angular effect. The component now safely defers the .play() call until the browser confirms the audio buffer is ready.

- Preventing History Pollution
The Problem: Adding tracks to the queueOfPlayedTracks (History) on every click quickly cluttered the queue with consecutive duplicates if a user kept restarting or clicking the same track.

The Solution: I wrote a filtering mechanism inside the setTrack options (addToHistory: true) that checks the history array before pushing, ensuring a clean, duplicate-free list that doubles as an active playback queue when the user toggles the "Queue" view.

3. The Final Result
By bridging Angular's reactive state (via signals/stores) with native DOM media elements through effects, I achieved a rock-solid audio player. The architecture gracefully scales whether the user is bouncing between deep-linked albums, scrolling through popular tracks, or managing their active history queue.

Also I have created 5 test for testing binding data inside component for about page and album components.

During that sprint I have read Angular documentation related HTTP, Routing and Testing. Also I have read Vitest official documnetaion to grasp some methods for testing.
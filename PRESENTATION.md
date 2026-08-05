# 2. The team showed the architecture and explained at least 2 decisions with trade-offs

## Architecture & Key Decisions

### High-Level Architecture

```text

[ Angular UI / Components ]

            │

            ▼

[ Feature Services (RxJS) ]

            │

            ▼

[ REST API / Backend ]

```

---

## Key Decisions & Trade-Offs

### Key Decision 1: Keeping State Management Simple (No NgRx)

- **Context:** We tried to use **NgRx Entities** to manage complex data collections like tracks, albums, and artists (`Tracks, Albums -> Tracks`, `Artists -> Tracks`). We wanted to use entity adapters to handle state changes.
- **Option A: Use NgRx Entities**
  - _Pros:_ Centralized data, good tools for complex state updates.
  - _Cons:_ Too much extra code (actions, reducers, selectors), complex setup, hard to learn quickly.
- **Option B: Simple HTTP Requests & RxJS (Our Choice)**
  - _Pros:_ Simple code, fast development, easy to understand for the whole team.
  - _Cons:_ No single central data store.
- **Why We Chose Option B:** After testing NgRx, we saw that it brought too much complexity and boilerplate code for our project size. We decided not to use NgRx. Sticking to simple HTTP requests and RxJS services helped us write code faster and avoid bugs.

---

### Key Decision 2: Feature Modules with Lazy Loading

- **Context:** We needed to structure our Angular application so it stays fast and easy to maintain.
- **Option A: Everything in One Module**
  - _Pros:_ Very easy to set up at the beginning.
  - _Cons:_ The app loads slowly because the initial file size is too big.
- **Option B: Feature Modules with Lazy Loading (Our Choice)**
  - _Pros:_ The app loads faster because pages load only when the user opens them.
  - _Cons:_ Requires a bit more work to set up routes correctly.
- **Why We Chose Option B:** We chose lazy loading to make the app start faster for the user and to keep our code clean and organized by features.

# 🎵 Music App

A collaborative educational project built with **Angular 21** as part of the RS School Angular course.
The application is inspired by Spotify and focuses on modern frontend development, teamwork, and best practices.

---

# 🎬 Product Demo

## User Story

> 📹 Demo video ([Demo](https://youtu.be/aE36MIKuBQM))

##### Description

1. New Account Registration (00:00 — 00:11)
   Initial State: The user arrives at the main page for unauthenticated users displaying the message "Please log in to listen to music".

Navigation: Clicks the Sign up button in the top right corner.

Form Completion:

Enters the username (Login): Rxbeat1.

Fills in the Password field.

Begins typing in the Confirm password field; a validation error appears ("Passwords do not match") until the input matches the password above.

Submission: Clicks the green Sign up button.

2. Sign-In & Content Viewing (00:12 — 00:18)
   Successful Login: A notification toast appears reading "Info: You are login".

Data Loading: A list of tracks is displayed (including Wish You Were Here, RED LIGHT, What is Love, etc.).

Storage Check: The user opens Chrome DevTools (Application -> Local Storage) to inspect the saved user key/token.

Sign-Out: Clicks the Log out button ("Info: You are log out" toast appears).

3. Re-Authentication & Invalid Password Handling (00:26 — 01:03)
   First Post-Registration Login: Clicks Log in, enters Rxbeat! with the correct password, successfully logs in, and then logs back out.

Authentication Error:

Clicks Log in again, enters Rxbeat!, but enters an incorrect password.

Clicks Log in — an error toast appears: "Error: Incorrect credentials".

Successful Login: Enters the correct password and clicks Log in — successfully authenticates ("Info: You are login").

4. Browsing Albums & Creating a Playlist (01:13 — 01:53)
   Browsing Albums: Navigates to the Albums tab, where a grid of albums (TriFace, Skaut, Pouce!, etc.) is shown.

Album Selection: Clicks on the Skaut album to view its tracklist on the right side.

Creating a Playlist:

Clicks the Create playlist button.

Types the name Favorite in the modal input field.

Clicks the green Create playlist button to submit.

Tab Navigation:

Switches to the Playlists tab — the newly created Favorite playlist is listed on the left.

Switches to the Tracks tab — displays the track "1. Un Poil De Rellifon".

5. Verifying Session Persistence (01:54 — 02:20)
   Sign-Out: Clicks Log out.

Re-Login: Clicks Log in, enters credentials for Rxbeat1, and signs in again.

Data Verification: Navigates back to the Playlists tab to verify that the previously created Favorite playlist and its tracks persisted across sessions.

The user:

1. Creates an account
2. Logs in
3. Browses artists and albums
4. Creates a playlist
5. Adds tracks
6. Returns later and sees saved playlists

---

# 🏗 Architecture

## Application Overview

```text
                           Browser
                               │
                               ▼
                        Angular Router
                               │
     ┌─────────────────────────┴────────────────────────┐
     │                                                  │
 Authentication Feature                    Music Features
 (Login / Sign Up)              Artists / Albums / Tracks / Playlists
     │                                                  │
     └─────────────────────────┬────────────────────────┘
                               ▼
                      Services (RxJS)
                               │
                         HttpClient
                               │
                               ▼
                          REST Backend

```

## Folder Structure

```
src/app
│
├── components/
│   ├── shared/
│   ├── pages/
│   └── ...
│
├── services/
│   ├── auth/
│   ├── notification/
│   └── ...
│
├── guards/
├── pipes/
├── routes/
├── styles/
├── modals/
├── directives/
├── interceptors/
└── store/
```

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

## ❌ Failure Story

### Problem

During testing we discovered that after logging out the application still displayed playlists.

### Why it happened

The authentication token was removed successfully, but the playlist data remained cached inside the Angular service.

### What we tried

Verified route guards
Checked token removal
Tested API authorization

Everything worked correctly.

### Root Cause

The cached playlist state inside the service wasn't cleared on logout.

### Solution

The logout process should also reset cached data inside application services (or a global state). This bug was found after the final sprint, so we documented it as technical debt.

### Lesson Learned

Removing authentication is only one part of logout. Client-side cached data must also be cleared.

## 👥 Team Contributions

### @dzichonka

#### Features

Login
Sign Up
Playlists
Backend integration

#### Learned

Worked on backend-oriented features, API integration, authentication flow and synchronization between frontend and backend.

### @snitkon

#### Features

Tracks
Albums → Tracks navigation
Artists → Tracks navigation
Reusable API service architecture
Left Sidebar wrapper
Loader system with HTTP Interceptor
Toast

#### Learned

Implemented Jamendo API integration using an abstract service pattern with separate services for Tracks, Albums, and Artists. Used Angular Dependency Injection to dynamically provide different services depending on the route.
Worked with RxJS streams, Signals, HTTP Interceptors, and HttpContext to build reactive data loading and a reusable loader system.
Created reusable layout components with a wrapper-based approach and improved my understanding of Angular architecture, dependency injection, and reactive programming.

### @DzmitryAliakseyeu

#### Features

Auth guards
Basic routes
Custom music player
Service to manage player state
Reusable components
Tests for about page, album, playlist-tracks, play-store service.

...

#### Learned

During this project, I strengthened my core Angular fundamentals by working with components, templates, signals, lifecycle hooks, and both Zone.js and zoneless change detection. I gained practical experience in Angular routing by configuring nested routes, lazy-loading strategies, and asynchronous route guards with confirmation dialogs. To manage reactive data flow, I deepened my understanding of RxJS, focusing on cold versus hot Observables, higher-order operators, and Subjects for shared state. A major focus was designing a centralized audio player architecture within PlayerStoreService to manage playback states, volume, history, and context-driven queues. I successfully synchronized Angular state with the native HTMLAudioElement using effect, computed, and onCleanup while safely handling asynchronous media events and browser autoplay restrictions. Additionally, I learned how to handle edge cases in audio streams, avoiding race conditions during rapid track switching and preventing duplicate history entries. Finally, I expanded my unit testing capabilities using Vitest and Angular testing tools to verify services and component data bindings.

...

## 🚀 What We Learned

Angular standalone architecture
Routing and lazy loading
RxJS
Working with REST APIs
Team collaboration using Git
Sprint planning and code reviews

## 📷 Screen shots

![Log in](https://pic2url.com/wp-content/uploads/2026/08/rXdb37uWGyUu.png)
![Sign up](https://pic2url.com/wp-content/uploads/2026/08/niTblJoPpeeL.png)
![Tracks](https://pic2url.com/wp-content/uploads/2026/08/amzNVDrjjXBe.png)
![Albums](https://pic2url.com/wp-content/uploads/2026/08/XBwCS5Q8yySW.png)
![Artists](https://pic2url.com/wp-content/uploads/2026/08/yjV0qt7lrVlv.png)
![Playlists](https://pic2url.com/wp-content/uploads/2026/08/qqfP9LkSG8QG.png)
![Tracks queue](https://pic2url.com/wp-content/uploads/2026/08/ammhEWjhYrd6.png)
![Light theme](https://pic2url.com/wp-content/uploads/2026/08/49LTV3bR08gT.png)
![Search](https://pic2url.com/wp-content/uploads/2026/08/g1Zx9wX1BsSO.png)
![Tost info](https://pic2url.com/wp-content/uploads/2026/08/DlanqUFzEvap.png)
![About](https://pic2url.com/wp-content/uploads/2026/08/X9LuuXezuvqc.png)
![Toast error](https://pic2url.com/wp-content/uploads/2026/08/my1dkkqnj9js.png)

# 🎵 Music App

A collaborative educational project built with **Angular 21** as part of the RS School Angular course.
The application is inspired by Spotify and focuses on modern frontend development, teamwork, and best practices.

---

# 🎬 Product Demo

## User Story

> 📹 Demo video (link will be here)

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

...

#### Learned

...

### @DzmitryAliakseyeu

#### Features

...

#### Learned

...

## 🚀 What We Learned

Angular standalone architecture
Routing and lazy loading
RxJS
Working with REST APIs
Team collaboration using Git
Sprint planning and code reviews

# Sprint 2:  Routing & Signals (@angular/router, @angular/core) — 2026-06-09

- **What was done:** Read Ben Lesh's and other articles about Observables and refactored my understanding of RxJS architecture (Cold vs Hot, Subjects).
- **Problems:** used to think of an Observable as just a "stream of data," which caused confusion when dealing with sharing state, execution logic, and the core difference between Observables and Subjects.
- **Solutions:** Realized that an Observable is just a subscription function (calling subscribe() is literally executing that function). Shifted perspective from "streams" to managing the relationships between producers and subscribers.

- **What I learned:**An Observable doesn't own the stream; it's a listener setup for a producer. Cold Observable: The producer is created inside the function (like a closure), so every subscriber gets a fresh instance of reality. Hot Observable: The producer lives outside, and subscribers share a single live source. Subject: A hybrid beast that acts as a duck-typed observable, a producer, and a subscriber registry all at once. It stays alive even after execution "completes".
- **Plans:** Stop thinking in "streams" and start analyzing who creates the values, who owns the state, and who connects to whom.
- **Time spent:** 15 hours.
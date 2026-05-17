# Sprint 1: Project Setup & Component Basics — 2025-05-13

- **What was done:** Add abstract class for storage and create local-storage implemented from abstraction.
- **Problems:** Spent time analyzing and deciding how to implement a highly reusable, strictly typed, and scalable storage class. The main challenge was designing a flexible architecture that avoids code duplication while remaining easy to scale for future storage requirements (like sessionStorage or other states).
- **Solutions:** Designed and implemented a highly reusable, type-safe abstract storage class. Created a concrete storage service implementation instantiated via an Angular factory (useFactory), ensuring a clean architecture, future scalability, and compliance with the project's strict typing.
- **What I learned:** I learned how to use abstract classes to hide core logic and make the code modular. It helped me understand how to put shared code in one place, so other services can use it without repeating the same code.
- **Plans:** I plan to improve this approach by adding new features to the abstract class.
- **Time spent:** 5 hours
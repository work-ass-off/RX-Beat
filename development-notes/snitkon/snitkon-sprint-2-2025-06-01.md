# Sprint 2:  Routing & Signals — 2025-06-01

- **What was done:** Designed and implemented a reusable sidebar component architecture for the application. Built a flexible sidebar shell that separates presentation logic from displayed content, allowing the same component to be reused for both left and right sidebars. Implemented dynamic content projection using Angular’s ng-content mechanism to inject custom Header and Content sections while keeping the sidebar structure consistent across different use cases.Added collapsible sidebar functionality with internal state management responsible for expanding and collapsing the component. The collapse behavior, animations, and layout logic are encapsulated within the sidebar shell, allowing consuming components to focus only on providing content.
- **Problems:**
    * Needed a solution that would prevent duplication of sidebar logic between left and right navigation panels.
    * The sidebar had to support different content layouts while maintaining a consistent UI structure and behavior.
    * Managing collapse functionality directly inside feature components would create unnecessary coupling and reduce reusability.
- **Solutions:**
    * Created a reusable wrapper component responsible for layout, state management, and collapse behavior.
    * Used Angular content projection (ng-content) to dynamically inject custom Header and Content sections into predefined sidebar slots.
    * Encapsulated all expand/collapse logic inside the sidebar shell, allowing any future sidebar implementation to inherit the same functionality without duplicating code.
    * Designed the component API to support future right-sidebar implementation by simply providing different projected content while reusing the existing wrapper and collapse logic.
- **What I learned:**
    * Gained practical experience with Angular Content Projection and how ng-content can be used to build highly reusable UI components.
    * Better understood component composition patterns and separation of responsibilities between layout containers and feature-specific content.
    * Learned how to design scalable UI architectures where behavior and presentation are abstracted into reusable building blocks.
    * Improved understanding of creating maintainable and extensible Angular components that minimize code duplication.
- **Plans:** Implement the right sidebar using the newly created reusable sidebar shell. Reuse the existing collapse/expand behavior and layout logic while providing custom content through Angular content projection. Continue refining the component architecture to maximize reusability and minimize duplication across application layouts.
- **Time spent:** 6 hours.
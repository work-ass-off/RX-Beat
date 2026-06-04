# Sprint 2:  Routing & Signals — 2025-06-03

- **What was done:** Implemented the right sidebar using the reusable sidebar shell developed in the previous sprint. Reused the existing layout, content projection slots, and collapse/expand functionality without introducing additional sidebar-specific logic. Integrated custom right-panel content through Angular ng-content, demonstrating the flexibility of the shared component architecture.Additionally, developed a reusable Dropdown component that can be utilized across multiple areas of the application. The component was designed to be configurable and independent from business logic, making it suitable for various selection and filtering scenarios throughout the project.
- **Problems:**
    * Needed to ensure that the reusable sidebar architecture could support multiple implementations without modification of the core component.
    * Required a flexible solution for dropdown menus that would avoid creating multiple similar components with duplicated logic.
    * Maintaining consistency between UI components while keeping them reusable and configurable.
- **Solutions:**
    * Reused the existing sidebar wrapper for the right panel, injecting only the required content while preserving all collapse behavior inside the shared shell component.
    * Applied Angular content projection to keep the sidebar structure independent from its displayed content.
    * Created a generic Dropdown component with configurable options and reusable interaction logic, allowing it to be easily integrated into different application features.
    * Kept component responsibilities isolated to improve maintainability and future scalability.
- **What I learned:**
    * Strengthened my understanding of reusable component architecture and composition patterns in Angular.
    * Gained more experience with content projection and designing components that separate behavior from content.
    * Learned how to create configurable UI elements that can serve multiple business requirements without code duplication.
    * Improved my ability to design scalable frontend structures that support future feature development.
- **Plans:** Begin working with NgRx by setting up the project configuration, establishing the base store architecture, and implementing the first core features using state management patterns. Focus on understanding Actions, Reducers, Selectors, and Effects while integrating NgRx into the existing application structure.
- **Time spent:** 6 hours.
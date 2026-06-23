# Sprint 3: Directives, Pipes & Forms — 2025-06-14

- **What was done:** Explored and implemented the two primary approaches to handling forms in Angular: Template-driven and Reactive Forms. For the Reactive approach, built a login form using FormGroup and FormControl, integrated standard validations alongside a synchronous custom validator (mustContainQuestionMark) and an asynchronous validator (emailIsUnique). Also implemented form state auto-saving to localStorage utilizing RxJS operators like debounceTime, and handled clean component destruction with DestroyRef. For the Template-driven approach, used FormsModule, ngModel, and template reference variables (#form="ngForm") to achieve similar form validation and tracking capabilities, extracting initial data safely via afterNextRender. Additionally, created a custom standalone Angular Pipe (TemperaturePipe) with flexible parameters to handle temperature conversions between Celsius and Fahrenheit.
- **Problems:**
    * Needed to find a clean way to apply advanced validation rules (like checking for specific characters or performing async uniqueness checks) directly within the Reactive Form configuration.
    * Required a non-blocking solution for auto-saving form values to localStorage without triggering storage updates on every single keystroke.
    * Managing safe access to the Template-driven form instance during the initial render phase before the view is fully initialized.
    * Designing a robust type-safe Pipe that can handle multiple input types (string, number, null) and correctly calculate/format conversion results based on optional parameters.
- **Solutions:**
    * Implemented custom validation functions leveraging Angular's AbstractControl, using standard RxJS of() observables to return error objects or null for asynchronous validation.
    * Connected a subscription to this.form.valueChanges and piped it through a debounceTime(500) operator to buffer rapidly occurring user inputs before saving to localStorage.
    * Utilized afterNextRender and the viewChild.required signal in the Template-driven component to guarantee the form controls are ready before setting or tracking values.
    * Created a TemperaturePipe implementing PipeTransform that dynamically checks inputType and outputType, sanitizes inputs via parseFloat, and returns formatted strings with correct °C / °F symbols.
- **What I learned:**
    * Deepened my knowledge of Angular Forms architecture, understanding when to favor the declarative simplicity of Template-driven forms versus the explicit programmatic control of Reactive Forms.
    * Mastered the utilization of FormGroup, FormControl, and control properties like .touched, .dirty, and .invalid for rendering context-aware error messages in UI templates.
    * Learned how to design and bind custom synchronous and asynchronous validators to individual FormControl instances.
    * Gained practical experience in lifecycle optimizations using modern tools like afterNextRender and handling RxJS subscription cleanups with DestroyRef.onDestroy.
    * Understood how to build reusable, pure data-transformation elements by implementing custom Angular Pipes with strict type checks and dynamic arguments.
- **Plans:** Move forward with exploring advanced Angular concepts, focusing on multi-step form structures (FormArray), state synchronization across complex component trees, and deep-diving into optimizing change detection strategies within larger enterprise applications.
- **Time spent:** 10 hours.
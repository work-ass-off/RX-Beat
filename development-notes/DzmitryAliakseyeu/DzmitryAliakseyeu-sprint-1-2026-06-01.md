# Sprint 2:  Routing & Signals (@angular/router, @angular/core) — 2026-06-01

- **What was done:** Read different articles about guards, including the official Angular.dev documentation, and studied the RxJS documentation. Created and implemented the login, and guest guards. Connected the library component via the Angular Router and added a login button for authenticated users inside it.Created a confirm dialog component with "Stay" and "Leave" buttons, implemented its core logic, and added internationalization (i18n).Implemented a toSlug utility function to replace symbols.
- **Problems:** During the development of the confirm dialog component, I faced an issue controlling its state during a pending navigation event.Initially, I did not know how to handle and resolve this state correctly.
- **Solutions:** I read multiple articles and used AI to explore existing architectural ways to solve this issue.I found out that I needed to handle the pending navigation state asynchronously, which could be done using either a Promise or an Observable.After refreshing my knowledge on both topics, I decided to use an Observable as a more native and compatible way to handle this Angular task.Ultimately, I implemented an RxJS Subject to act as an asynchronous bridge between Angular's routing mechanism and user actions in the interface.

```

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private pendingNavigation$: Subject<boolean> | undefined = undefined;
  public readonly isConfirmDialogOpen = signal(false);
  public readonly isFormDirty = signal(false);

  public hasUnsavedChanges(): boolean {
    return this.isFormDirty();
  }

  public canDeactivate(): CanDeactivateResult {
    if (!this.hasUnsavedChanges()) {
      return true;
    }

    if (this.pendingNavigation$) {
      return this.pendingNavigation$.asObservable();
    }

    this.isConfirmDialogOpen.set(true);
    this.pendingNavigation$ = new Subject<boolean>();

    return this.pendingNavigation$.asObservable();
  }

  public onManageButtonClick(value: ManageButton): void {
    if (value === ManageButton.CONFIRM) {
      this.onConfirmLeave();
    } else if (value === ManageButton.CANCEL) {
      this.onStayOnPage();
    }
  }

  private onConfirmLeave(): void {
    this.resolveNavigationDecision(true);
  }

  private onStayOnPage(): void {
    this.resolveNavigationDecision(false);
  }

  private resolveNavigationDecision(allowNavigation: boolean): void {
    this.isConfirmDialogOpen.set(false);
    if (this.pendingNavigation$) {
      this.pendingNavigation$.next(allowNavigation);
      this.pendingNavigation$.complete();
      this.pendingNavigation$ = undefined;
    }
  }
}

```

- **What I learned:** Refreshed my knowledge of Angular Guards, Routing, and RxJS Subjects.Learned how to handle asynchronous operations that require waiting for user interaction.Mastered using an RxJS Subject as an asynchronous bridge to hold Angular Router navigation until a user makes a choice in the UI.
- **Plans:** I have plan to develop custom player.
- **Time spent:** 65 hours.
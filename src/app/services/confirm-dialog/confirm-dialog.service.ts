import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import type { CanDeactivateResult } from './confirm-dialog.model';
import { ManageButton } from './confirm-dialog.model';

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

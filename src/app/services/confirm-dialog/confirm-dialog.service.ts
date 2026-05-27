import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { canDeactivateResult, ManageButton } from './confirm-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private manageButton = ManageButton;
  private pendingNavigation$: Subject<boolean> | undefined = undefined;
  public readonly isConfirmDialogOpen = signal(false);
  public readonly isFormDirty = signal(false);
  public readonly buttonClicked = signal<string>('');

  public hasUnsavedChanges(): boolean {
    return this.isFormDirty();
  }

  public canDeactivate(): canDeactivateResult {
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

  public onManageButtonClick(value: string): void {
    this.buttonClicked.set(value);
    if (this.buttonClicked() === this.manageButton.CONFIRM) {
      this.onConfirmLeave();
    } else if (this.buttonClicked() === this.manageButton.CANCEL) {
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

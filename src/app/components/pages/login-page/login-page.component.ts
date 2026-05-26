import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private pendingNavigationResolve: ((result: boolean) => void) | null = null;

  public readonly isConfirmDialogOpen = signal(false);

  public readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this.form.markAsPristine();
    }
  }

  public hasUnsavedChanges(): boolean {
    console.log('dirty');
    return this.form.dirty;
  }

  public canDeactivate(): boolean | Promise<boolean> {
    if (!this.hasUnsavedChanges()) {
      return true;
    }

    this.isConfirmDialogOpen.set(true);

    return new Promise((resolve) => {
      this.pendingNavigationResolve = resolve;
    });
  }

  public onConfirmLeave(): void {
    this.resolveNavigationDecision(true);
  }

  public onStayOnPage(): void {
    this.resolveNavigationDecision(false);
  }

  private resolveNavigationDecision(allowNavigation: boolean): void {
    this.isConfirmDialogOpen.set(false);
    this.pendingNavigationResolve?.(allowNavigation);
    this.pendingNavigationResolve = null;
  }
}

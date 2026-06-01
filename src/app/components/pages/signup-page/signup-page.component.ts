import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@Component({
  selector: 'app-signup-page',
  imports: [ConfirmDialogComponent, SignupFormComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  protected confirmDialogService = inject(ConfirmDialogService);

  public readonly signupFormComponent = viewChild<SignupFormComponent>(SignupFormComponent);

  protected hasUnsavedChanges(): boolean {
    const isDirty = computed(() => this.signupFormComponent()?.isDirty() ?? false);
    this.confirmDialogService.isFormDirty.set(isDirty());
    return isDirty();
  }
}

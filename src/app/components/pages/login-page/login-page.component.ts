import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog.service';
import { SigninFormComponent } from './signin-form/signin-form.component';

@Component({
  selector: 'app-login-page',
  imports: [ConfirmDialogComponent, SigninFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  protected confirmDialogService = inject(ConfirmDialogService);

  public readonly signinFormComponent = viewChild<SigninFormComponent>(SigninFormComponent);

  protected hasUnsavedChanges(): boolean {
    const isDirty = computed(() => this.signinFormComponent()?.isDirty() ?? false);
    this.confirmDialogService.isFormDirty.set(isDirty());
    return isDirty();
  }
}

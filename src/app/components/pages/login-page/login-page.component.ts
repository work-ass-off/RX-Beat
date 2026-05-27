import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  protected confirmDialogService = inject(ConfirmDialogService);

  public readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this.form.markAsPristine();
    }
  }

  protected hasUnsavedChanges(): boolean {
    this.confirmDialogService.isFormDirty.set(this.form.dirty);
    return this.form.dirty;
  }
}

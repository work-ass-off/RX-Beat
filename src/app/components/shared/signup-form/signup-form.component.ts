import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  public readonly RxBeatApiService = inject(RxBeatApiService);
  private formBuilder = inject(FormBuilder);
  public notificationService = inject(NotificationService);

  public signupForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  public onSignUp(): void {
    this.notificationService.clear();
    if (this.signupForm.invalid) {
      return;
    }
    const data = {
      login: this.signupForm.value.login ?? '',
      password: this.signupForm.value.password ?? '',
    };
    this.RxBeatApiService.signup(data).pipe(take(1)).subscribe();
  }
}

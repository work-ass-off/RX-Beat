import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-signin-form',
  imports: [ReactiveFormsModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {
  public readonly RxBeatApiService = inject(RxBeatApiService);
  private formBuilder = inject(FormBuilder);
  public notificationService = inject(NotificationService);

  public signinForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSignIn(): void {
    console.log(this.signinForm.value);
    this.notificationService.clear();
    if (this.signinForm.invalid) {
      return;
    }
    const data = {
      login: this.signinForm.value.login ?? '',
      password: this.signinForm.value.password ?? '',
    };
    this.RxBeatApiService.login(data).pipe(take(1)).subscribe();
  }
}

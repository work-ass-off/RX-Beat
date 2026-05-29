import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxBeatApiService, type Token } from '../../../services/rx-beat-api/rx-beat-api.service';
import { type Observable } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent {
  public readonly RxBeatApiService = inject(RxBeatApiService);
  private formBuilder = inject(FormBuilder);
  public notificationService = inject(NotificationService);

  public $user: Observable<Token> | null = null;

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
    this.$user = this.RxBeatApiService.signup(data);
  }
}

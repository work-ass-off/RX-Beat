import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { type Observable } from 'rxjs';
import { RxBeatApiService, type User } from '../../../services/rx-beat-api/rx-beat-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signin-form',
  imports: [ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {
  public readonly RxBeatApiService = inject(RxBeatApiService);
  private formBuilder = inject(FormBuilder);

  public $user: Observable<User> | null = null;

  public signinForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSignIn(): void {
    if (this.signinForm.invalid) {
      return;
    }
    const data = {
      login: this.signinForm.value.login ?? '',
      password: this.signinForm.value.password ?? '',
    };
    this.$user = this.RxBeatApiService.signin(data);
  }
}

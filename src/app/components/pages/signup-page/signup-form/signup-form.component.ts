import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { NotificationService } from '../../../../services/notification/notification.service';
import { RxBeatApiService } from '../../../../services/rx-beat-api/rx-beat-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private router = inject(Router);

  public isDirty = signal(false);

  public signupForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  constructor() {
    this.signupForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.isDirty.set(this.signupForm.dirty);
    });
  }
  public onSignUp(): void {
    this.notificationService.clear();
    if (this.signupForm.invalid) {
      return;
    }
    const data = {
      login: this.signupForm.value.login ?? '',
      password: this.signupForm.value.password ?? '',
    };
    this.RxBeatApiService.signup(data)
      .pipe(
        take(1),
        tap(() => {
          this.signupForm.reset();
          this.router.navigate(['']);
        }),
      )
      .subscribe();
  }
}

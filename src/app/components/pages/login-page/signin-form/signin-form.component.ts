import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxBeatApiService } from '../../../../services/rx-beat-api/rx-beat-api.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  public isDirty = signal(false);

  public signinForm = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    this.signinForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.isDirty.set(this.signinForm.dirty);
    });
  }

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
    this.RxBeatApiService.login(data)
      .pipe(
        take(1),
        tap(() => {
          this.signinForm.reset();
          this.router.navigate(['']);
        }),
      )
      .subscribe();
  }
}

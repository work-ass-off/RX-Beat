import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-signin-form',
  imports: [],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent {}

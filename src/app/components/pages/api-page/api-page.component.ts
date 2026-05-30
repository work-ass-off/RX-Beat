import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignupFormComponent } from '../signup-page/signup-form/signup-form.component';
import { SigninFormComponent } from '../login-page/signin-form/signin-form.component';

@Component({
  selector: 'app-api-page',
  imports: [SignupFormComponent, SigninFormComponent],
  templateUrl: './api-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'page',
  },
})
export class ApiPageComponent {}

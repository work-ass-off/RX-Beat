import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignupFormComponent } from '../../shared/signup-form/signup-form.component';
import { SigninFormComponent } from '../../shared/signin-form/signin-form.component';

@Component({
  selector: 'app-api-page',
  imports: [SignupFormComponent, SigninFormComponent],
  templateUrl: './api-page.component.html',
  // styleUrl: './api-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'page',
  },
})
export class ApiPageComponent {}

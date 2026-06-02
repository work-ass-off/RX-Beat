import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { type User } from '../../../services/rx-beat-api/rx-beat-api.service';

@Component({
  selector: 'app-profile-page',
  imports: [TranslatePipe, AsyncPipe, JsonPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
})
export class ProfilePageComponent {
  public httpClient = inject(HttpClient);

  private readonly apiUrl = environment.rxBeatUrl;
  public user$ = this.httpClient.get<User>(`${this.apiUrl}/users/me`);
}

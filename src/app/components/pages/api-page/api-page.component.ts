import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-api-page',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './api-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'page',
  },
})
export class ApiPageComponent {
  public httpClient = inject(HttpClient);
  public notificationService = inject(NotificationService);

  private readonly apiUrl = environment.rxBeatUrl;
  public users$ = this.httpClient.get(`${this.apiUrl}/users`);
}

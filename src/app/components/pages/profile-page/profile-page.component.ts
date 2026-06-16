import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RxBeatApiService } from '../../../services/rx-beat-api/rx-beat-api.service';

@Component({
  selector: 'app-profile-page',
  imports: [TranslatePipe, AsyncPipe, JsonPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
})
export class ProfilePageComponent {
  public RxBeatApiService = inject(RxBeatApiService);
  public user$ = this.RxBeatApiService.me();
}

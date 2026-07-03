import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrackComponent } from '../../../../shared/track/track.component';
import { LoadingService } from '../../../../../services/loading/loading.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { map, type Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoaderSpinnerComponent } from '../../../../shared/loader-spinner/loader-spinner.component';
import { JamendoAbstractService } from '../../../../../services/jamendo/jamendo-abstract/jamendo-abstract.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Track } from '../../../../../models';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-tracks-page',
  imports: [TrackComponent, AsyncPipe, LoaderSpinnerComponent, RouterLink],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.scss',
  host: {
    class: 'tracks',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TracksPageComponent {
  private _jamendoService = inject(JamendoAbstractService);
  private _loadingService = inject(LoadingService);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);

  public notificationService = inject(NotificationService);
  public isAuthorized = this._authService.isLoggedIn;
  public loading = this._loadingService.isLoaderActive('tracks');

  public tracks$: Observable<Track[]> = this._activatedRoute.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      if (id) {
        return this._jamendoService.getDataById(id).pipe(map((result) => result?.tracks ?? []));
      }
      return this._jamendoService.data$;
    }),
  );
}

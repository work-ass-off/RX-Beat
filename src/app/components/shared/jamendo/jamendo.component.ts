import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { TrackCardComponent } from '../track-card/track-card.component';
import { LoadingService } from '../../../services/loading/loading.service';
import { AsyncPipe } from '@angular/common';
import { JamendoAbstractService } from '../../../services/jamendo/jamendo-abstract/jamendo-abstract.service';

@Component({
  selector: 'app-jamendo',
  imports: [LoaderComponent, TrackCardComponent, AsyncPipe],
  templateUrl: './jamendo.component.html',
  styleUrl: './jamendo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamendoComponent {
  private jamendoService = inject(JamendoAbstractService);
  private loadingService = inject(LoadingService);

  public tracks$ = this.jamendoService.data$;
  public loading = this.loadingService.isLoaderActive('tracks');
}

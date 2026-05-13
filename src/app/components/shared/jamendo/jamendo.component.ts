import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { JamendoService } from '../../../services/jamendo.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-jamendo',
  imports: [AsyncPipe],
  templateUrl: './jamendo.component.html',
  styleUrl: './jamendo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JamendoComponent {
  private jamendoService = inject(JamendoService);

  tracks$ = this.jamendoService.getPopularTracks();
}

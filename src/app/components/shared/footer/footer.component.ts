import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'footer[app-footer]',
  imports: [PlayerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '../../components/content/content.component';

@Component({
  selector: 'app-all-page',
  imports: [ContentComponent],
  templateUrl: './all-page.component.html',
  styleUrl: './all-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPageComponent {}

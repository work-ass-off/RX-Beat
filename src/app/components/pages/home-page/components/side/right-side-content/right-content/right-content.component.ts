import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-right-content',
  imports: [],
  templateUrl: './right-content.component.html',
  styleUrl: './right-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightContentComponent {}

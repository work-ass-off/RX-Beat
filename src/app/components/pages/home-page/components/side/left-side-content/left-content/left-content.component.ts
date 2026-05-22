import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-left-content',
  imports: [],
  templateUrl: './left-content.component.html',
  styleUrl: './left-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftContentComponent {}

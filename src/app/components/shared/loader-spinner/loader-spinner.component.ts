import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  imports: [CommonModule],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderSpinnerComponent {
  public readonly size = input<string>('80px');
}

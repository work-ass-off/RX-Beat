import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '../../../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'toast-container',
  },
})
export class ToastComponent {}

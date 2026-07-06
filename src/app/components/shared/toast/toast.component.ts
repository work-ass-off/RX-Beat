import { trigger, transition, style, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'toast-container',
  },
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ transform: 'translateY(100%)', opacity: 0 }))]),
    ]),
  ],
})
export class ToastComponent {
  private toastService = inject(ToastService);

  public toasts = this.toastService.toasts;

  public removeToast(id: number): void {
    this.toastService.remove(id);
  }
}

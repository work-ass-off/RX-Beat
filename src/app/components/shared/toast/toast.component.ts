import { trigger, transition, style, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, type OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';
import type { Toast } from '../../../models';
import type { Subscription } from 'rxjs';

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
export class ToastComponent implements OnInit {
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  public toasts: Toast[] = [];

  public ngOnInit(): void {
    const subscription: Subscription = this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
      this.cdr.markForCheck();
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  public removeToast(id: number): void {
    this.toastService.remove(id);
  }
}

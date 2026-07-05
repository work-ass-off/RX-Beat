import { Injectable, signal } from '@angular/core';
import type { Toast } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);

  public toasts = this.toastsSignal.asReadonly();

  private show(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): number {
    const id = Date.now();
    const toast: Toast = { id, title, message, type };
    this.toastsSignal.update((currentToasts) => [...currentToasts, toast]);
    setTimeout(() => this.remove(id), 3000);
    return id;
  }

  public remove(id: number): void {
    this.toastsSignal.update((currentToasts) => currentToasts.filter((t) => t.id !== id));
  }

  public success(title: string, message: string): number {
    return this.show(title, message, 'success');
  }

  public error(title: string, message: string): number {
    return this.show(title, message, 'error');
  }

  public warning(title: string, message: string): number {
    return this.show(title, message, 'warning');
  }

  public info(title: string, message: string): number {
    return this.show(title, message, 'info');
  }
}

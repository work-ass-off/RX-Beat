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

  public success(message: string): number {
    return this.show('Success', message, 'success');
  }

  public error(message: string): number {
    return this.show('Error', message, 'error');
  }

  public warning(message: string): number {
    return this.show('Warning', message, 'warning');
  }

  public info(message: string): number {
    return this.show('Info', message, 'info');
  }
}

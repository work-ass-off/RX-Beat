import { Injectable } from '@angular/core';
import type { Toast } from '../../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);

  public toasts$ = this.toastSubject.asObservable();

  private show(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): number {
    const id = Date.now();
    const toast: Toast = { id, title, message, type };
    this.toasts.push(toast);
    this.toastSubject.next(this.toasts);
    setTimeout(() => this.remove(id), 3000);
    return id;
  }

  public remove(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.toastSubject.next(this.toasts);
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

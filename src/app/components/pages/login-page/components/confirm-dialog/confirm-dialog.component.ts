import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  public readonly confirmed = output<void>();
  public readonly cancelled = output<void>();
  private readonly isOpen = signal<boolean>(false);

  constructor() {
    this.isOpen.set(true);
  }

  public onConfirm(): void {
    this.confirmed.emit();
    this.isOpen.set(false);
  }

  public onCancel(): void {
    this.cancelled.emit();
    this.isOpen.set(false);
  }
}

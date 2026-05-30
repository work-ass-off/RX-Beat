import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ManageButton } from '../../../services/confirm-dialog/confirm-dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  imports: [TranslatePipe],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  public readonly ManageButton = ManageButton;
  public buttonClicked = output<ManageButton>();

  public onButtonClick(buttonType: ManageButton): void {
    this.buttonClicked.emit(buttonType);
  }
}

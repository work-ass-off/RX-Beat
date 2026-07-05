import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarWrapperComponent } from '../../shared/sidebar-wrapper/sidebar-wrapper.component';
import { RightHeaderComponent } from './components/side/right-side-content/right-header/right-header.component';
import { RightContentComponent } from './components/side/right-side-content/right-content/right-content.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    SidebarWrapperComponent,
    RightHeaderComponent,
    RightContentComponent,
    RouterOutlet,
    ToastComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
})
export class HomePageComponent {
  private toastService = inject(ToastService);

  public showToastError(): void {
    this.toastService.error('Error', 'This is Error Message');
  }

  public showToastWarning(): void {
    this.toastService.warning('Warning', 'This is Warning Message');
  }

  public showToastSuccess(): void {
    this.toastService.success('Success', 'This is Success Message');
  }

  public showToastInfo(): void {
    this.toastService.info('Info', 'This is Info Message');
  }
}

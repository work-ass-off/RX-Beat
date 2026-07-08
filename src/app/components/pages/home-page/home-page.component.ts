import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarWrapperComponent } from '../../shared/sidebar-wrapper/sidebar-wrapper.component';
import { RightHeaderComponent } from './components/side/right-side-content/right-header/right-header.component';
import { RightContentComponent } from './components/side/right-side-content/right-content/right-content.component';
import { ToastComponent } from '../../shared/toast/toast.component';

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
export class HomePageComponent {}

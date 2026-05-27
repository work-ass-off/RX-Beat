import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarWrapperComponent } from '../../shared/sidebar-wrapper/sidebar-wrapper.component';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, FooterComponent, ContentComponent, RouterOutlet, SidebarWrapperComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}

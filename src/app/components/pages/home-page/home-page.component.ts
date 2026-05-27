import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarWrapperComponent } from '../../shared/sidebar-wrapper/sidebar-wrapper.component';
import { LeftHeaderComponent } from './components/side/left-side-content/left-header/left-header.component';
import { LeftContentComponent } from './components/side/left-side-content/left-content/left-content.component';
import { ContentComponent } from './components/content/content.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    RouterOutlet,
    SidebarWrapperComponent,
    LeftHeaderComponent,
    LeftContentComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}

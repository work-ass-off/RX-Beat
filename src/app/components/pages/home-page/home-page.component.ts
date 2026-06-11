import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { RouterOutlet } from '@angular/router';
import { SidebarWrapperComponent } from '../../shared/sidebar-wrapper/sidebar-wrapper.component';
import { LeftHeaderComponent } from './components/side/left-side-content/left-header/left-header.component';
import { LeftContentComponent } from './components/side/left-side-content/left-content/left-content.component';
import { RightHeaderComponent } from './components/side/right-side-content/right-header/right-header.component';
import { RightContentComponent } from './components/side/right-side-content/right-content/right-content.component';

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
    RightHeaderComponent,
    RightContentComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
})
export class HomePageComponent {}

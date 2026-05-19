import { Component } from '@angular/core';
import { HeaderComponent } from './components/shared/header/header.component';
import { JamendoComponent } from './components/shared/jamendo/jamendo.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, JamendoComponent, FooterComponent, HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'container' },
})
export class App {}

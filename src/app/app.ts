import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { JamendoComponent } from './components/shared/jamendo/jamendo.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, JamendoComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'container' },
})
export class App {}

import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { HeaderLink } from './header.model';
import { TranslatePipe } from '@ngx-translate/core';

const HEADER_LINKS: HeaderLink[] = [
  { label: 'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.TRACKS', link: 'tracks' },
  { label: 'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.ALBUMS', link: 'albums' },
  { label: 'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.ARTISTS', link: 'artists' },
  { label: 'MAIN.SIDEBAR.MY_LIBRARY.FILTERS.PLAYLISTS', link: 'playlists' },
];

@Component({
  selector: 'header[app-home-header]',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  public readonly links = HEADER_LINKS;

  private showArrowRight = signal<boolean>(false);
  public isShowArrowRight = this.showArrowRight.asReadonly();

  private showArrowLeft = signal<boolean>(false);
  public isShowArrowLeft = this.showArrowLeft.asReadonly();

  private scrollContainer = viewChild.required<ElementRef<HTMLDivElement>>('scrollContainer');

  public ngAfterViewInit(): void {
    this.checkScroll();
  }

  public onResize(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    const el = this.scrollContainer().nativeElement;

    const canScrollLeft = el.scrollLeft > 5;
    this.showArrowLeft.set(canScrollLeft);

    const hasMoreToScroll = el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
    this.showArrowRight.set(hasMoreToScroll);
  }

  public scrollLeft(): void {
    const el = this.scrollContainer().nativeElement;
    el.scrollBy({ left: -150, behavior: 'smooth' });

    setTimeout(() => this.checkScroll(), 300);
  }

  public scrollRight(): void {
    const el = this.scrollContainer().nativeElement;
    el.scrollBy({ left: 150, behavior: 'smooth' });

    setTimeout(() => this.checkScroll(), 300);
  }

  public onScroll(): void {
    this.checkScroll();
  }
}

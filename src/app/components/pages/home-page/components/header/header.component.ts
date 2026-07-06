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

const HeaderLinks: HeaderLink[] = [
  { name: 'Tracks', link: 'tracks' },
  { name: 'Albums', link: 'albums' },
  { name: 'Artists', link: 'artists' },
  { name: 'Playlists', link: 'playlists' },
];

@Component({
  selector: 'header[app-home-header]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  public readonly links = HeaderLinks;

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

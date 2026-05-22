import type { AfterViewInit, ElementRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, input, output, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filters-carousel',
  imports: [TranslatePipe],
  templateUrl: './filters-carousel.component.html',
  styleUrl: './filters-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class FiltersCarouselComponent implements AfterViewInit {
  public filters = input<string[]>([]);

  public filterSelected = output<string>();

  private activeFilter = signal<string | null>(null);
  public isActiveFilter = this.activeFilter.asReadonly();

  private showArrowRight = signal<boolean>(false);
  public isShowArrowRight = this.showArrowRight.asReadonly();

  private showArrowLeft = signal<boolean>(false);
  public isShowArrowLeft = this.showArrowLeft.asReadonly();

  private scrollContainer = viewChild.required<ElementRef<HTMLDivElement>>('scrollContainer');

  ngAfterViewInit() {
    this.checkScroll();
  }

  onResize() {
    this.checkScroll();
  }

  private checkScroll() {
    const el = this.scrollContainer().nativeElement;

    const canScrollLeft = el.scrollLeft > 5;
    this.showArrowLeft.set(canScrollLeft);

    const hasMoreToScroll = el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
    this.showArrowRight.set(hasMoreToScroll);
  }

  public selectFilter(filter: string) {
    if (this.activeFilter() === filter) {
      this.activeFilter.set(null);
      this.filterSelected.emit('');
    } else {
      this.activeFilter.set(filter);
      this.filterSelected.emit(filter);
    }
  }

  public scrollLeft() {
    const el = this.scrollContainer().nativeElement;
    el.scrollBy({ left: -150, behavior: 'smooth' });

    setTimeout(() => this.checkScroll(), 300);
  }

  public scrollRight() {
    const el = this.scrollContainer().nativeElement;
    el.scrollBy({ left: 150, behavior: 'smooth' });

    setTimeout(() => this.checkScroll(), 300);
  }

  public onScroll() {
    this.checkScroll();
  }
}

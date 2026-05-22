import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FiltersCarouselComponent } from './filters-carousel.component';

describe('FiltersCarouselComponent', () => {
  let component: FiltersCarouselComponent;
  let fixture: ComponentFixture<FiltersCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

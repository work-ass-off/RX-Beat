import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { GenreSectionComponent } from './genre-section.component';

describe('GenreSectionComponent', () => {
  let component: GenreSectionComponent;
  let fixture: ComponentFixture<GenreSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

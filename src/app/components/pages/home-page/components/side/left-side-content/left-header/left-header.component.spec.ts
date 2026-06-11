import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { LeftHeaderComponent } from './left-header.component';

describe('LeftHeaderComponent', () => {
  let component: LeftHeaderComponent;
  let fixture: ComponentFixture<LeftHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

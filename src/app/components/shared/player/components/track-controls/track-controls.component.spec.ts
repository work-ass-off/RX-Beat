import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { TrackControlsComponent } from './track-controls.component';

describe('TrackControlsComponent', () => {
  let component: TrackControlsComponent;
  let fixture: ComponentFixture<TrackControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { NewPlaylistBtnComponent } from './new-playlist-btn.component';

describe('NewPlaylistBtnComponent', () => {
  let component: NewPlaylistBtnComponent;
  let fixture: ComponentFixture<NewPlaylistBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPlaylistBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPlaylistBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

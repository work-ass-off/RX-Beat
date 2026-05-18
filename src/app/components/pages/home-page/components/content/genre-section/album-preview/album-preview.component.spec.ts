import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { AlbumPreviewComponent } from './album-preview.component';

describe('AlbumPreviewComponent', () => {
  let component: AlbumPreviewComponent;
  let fixture: ComponentFixture<AlbumPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

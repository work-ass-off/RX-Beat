import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { PlaylistsTracksComponent } from './playlists-tracks.component';

describe('PlaylistsTracksComponent', () => {
  let component: PlaylistsTracksComponent;
  let fixture: ComponentFixture<PlaylistsTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsTracksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistsTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

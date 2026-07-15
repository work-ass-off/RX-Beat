import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { NewPlaylistComponent } from './new-playlist.component';
import { DialogRef } from '@angular/cdk/dialog';

describe('NewPlaylistComponent', () => {
  let component: NewPlaylistComponent;
  let fixture: ComponentFixture<NewPlaylistComponent>;

  const dialogRefMock = {
    close: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPlaylistComponent],
      providers: [{ provide: DialogRef, useValue: dialogRefMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new playlist component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form for playlist creation', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.textContent).toContain('Create new playlist');
  });
});

import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import type { Album } from '../../../models';

import { AlbumComponent } from './album.component';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;

  const baseAlbum: Album = {
    id: 'album-1',
    name: 'Test Album',
    releasedate: '2024-01-15',
    artist_id: 'artist-1',
    artist_name: 'Test Artist',
    image: 'https://cdn.example.com/album.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('album', baseAlbum);
    fixture.componentRef.setInput('index', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render album bindings in template', () => {
    const host: HTMLElement = fixture.nativeElement;

    const albumName = host.querySelector('.name');
    const artistName = host.querySelector('.artist-name');
    const release = host.querySelector('.release');

    expect(albumName?.textContent?.trim()).toBe('Test Album');
    expect(artistName?.textContent?.trim()).toBe('Test Artist');
    expect(release?.textContent?.trim()).toBe('2024');
  });

  it('should render album image when image is provided', () => {
    const host: HTMLElement = fixture.nativeElement;

    const image = host.querySelector('img.image');
    const placeholder = host.querySelector('.image-placeholder');

    expect(image).toBeTruthy();
    expect(image?.getAttribute('alt')).toBe('Test Album');
    expect(placeholder).toBeFalsy();
  });

  it('should render placeholder when image is missing', () => {
    const albumWithoutImage: Album = {
      ...baseAlbum,
      image: '',
      name: 'No Image Album',
    };

    fixture.componentRef.setInput('album', albumWithoutImage);
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const image = host.querySelector('img.image');
    const placeholder = host.querySelector('.image-placeholder');

    expect(image).toBeFalsy();
    expect(placeholder?.textContent?.trim()).toBe('No Image Album');
  });
});

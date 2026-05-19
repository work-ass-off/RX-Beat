import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastsPageComponent } from './podcasts-page.component';

describe('PodcastsPageComponent', () => {
  let component: PodcastsPageComponent;
  let fixture: ComponentFixture<PodcastsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PodcastsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PodcastsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

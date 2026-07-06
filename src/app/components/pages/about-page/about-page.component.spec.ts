import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const element = fixture.nativeElement;
    console.log(element);
    const title = element.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('About');
  });

  it('should have a description', () => {
    const element = fixture.nativeElement;
    const description = element.querySelector('p');
    expect(description).toBeTruthy();
    expect(description.textContent).toContain(
      'WorkAssOff is an application that allows you to find information about artists, albums, tracks, and genres.',
    );
  });
});

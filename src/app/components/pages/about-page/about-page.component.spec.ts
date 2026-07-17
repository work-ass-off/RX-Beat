import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AboutPageComponent } from './about-page.component';
describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPageComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an image', () => {
    const element = fixture.nativeElement;
    const image = element.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.src).toContain('assets/gif/black-cat.gif');
  });

  it('title should have a text', () => {
    const element = fixture.nativeElement;
    const title = element.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title.textContent).toBeDefined();
  });

  it('should have a description', () => {
    const element = fixture.nativeElement;
    const description = element.querySelector('p');
    expect(description).toBeTruthy();
    expect(description.textContent).toBeDefined();
  });

  it('should have 3 links to the GitHub repository', () => {
    const element = fixture.nativeElement;
    const link = element.querySelector('a');
    const allLinks = element.querySelectorAll('a');
    expect(link).toBeTruthy();
    expect(link.href).toContain('github.com');
    expect(allLinks.length).toBe(3);
  });
});

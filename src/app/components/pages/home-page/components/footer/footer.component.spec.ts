import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create footer on main psge', () => {
    expect(component).toBeTruthy();
  });

  it('should render rs-school icon', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img[alt="rss-logo"]');
    expect(logo).toBeTruthy();
  });
});

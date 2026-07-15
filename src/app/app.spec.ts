import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

let fixture: ComponentFixture<App>;
let app: App;

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideTranslateService({})],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a defined authService', () => {
    expect(app['authService']).toBeDefined();
  });

  it('should have a defined isLoggedIn computed property', () => {
    expect(app['isLoggedIn']).toBeDefined();
  });

  it('should render header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeTruthy();
  });

  it('should render header with correct content', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('RX Beat');
  });

  it('should render footer', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')).toBeTruthy();
  });
});

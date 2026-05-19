import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { JamendoComponent } from './jamendo.component';

describe('JamendoComponent', () => {
  let component: JamendoComponent;
  let fixture: ComponentFixture<JamendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JamendoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JamendoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { DropdownContentComponent } from './dropdown-content.component';

describe('DropdownContentComponent', () => {
  let component: DropdownContentComponent;
  let fixture: ComponentFixture<DropdownContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

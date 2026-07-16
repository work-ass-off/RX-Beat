import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { provideTranslateService } from '@ngx-translate/core';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { SearchService } from '../../../services/search/search.service';
import { JamendoAutocompleteService } from '../../../services/jamendo/jamendo-autocomplete/jamendo-autocomplete.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let searchServiceMock: {
    searchQuery: ReturnType<typeof signal<string>>;
  };

  let jamendoAutocompleteServiceMock: {
    isAutocompleteOpen: ReturnType<typeof signal<boolean>>;
    queryData: ReturnType<typeof signal<string>>;
    autocomplete$: ReturnType<typeof of>;
    getAutocompleteItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    searchServiceMock = {
      searchQuery: signal(''),
    };

    jamendoAutocompleteServiceMock = {
      isAutocompleteOpen: signal(false),
      queryData: signal(''),
      autocomplete$: of(),
      getAutocompleteItem: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideTranslateService(),
        { provide: SearchService, useValue: searchServiceMock },
        { provide: JamendoAutocompleteService, useValue: jamendoAutocompleteServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create search component', () => {
    expect(component).toBeTruthy();
  });

  it('should open autocomplete and update query when user types', () => {
    component.onTypeSearch('rock');

    expect(jamendoAutocompleteServiceMock.isAutocompleteOpen()).toBe(true);

    expect(jamendoAutocompleteServiceMock.queryData()).toBe('rock');
  });

  it('should confirm search query', () => {
    component.onConfirmSearch('rock');

    expect(jamendoAutocompleteServiceMock.queryData()).toBe('rock');

    expect(searchServiceMock.searchQuery()).toBe('rock');

    expect(jamendoAutocompleteServiceMock.isAutocompleteOpen()).toBe(false);
  });
});

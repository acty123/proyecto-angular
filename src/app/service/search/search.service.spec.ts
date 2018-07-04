import { TestBed, inject } from '@angular/core/testing';

import { Search\searchService } from './search\search.service';

describe('Search\searchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Search\searchService]
    });
  });

  it('should be created', inject([Search\searchService], (service: Search\searchService) => {
    expect(service).toBeTruthy();
  }));
});

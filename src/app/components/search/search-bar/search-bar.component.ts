import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'; 
import {Router} from '@angular/router';
import { Observable,Subject,of } from 'rxjs';
import { debounceTime,distinctUntilChanged,tap,catchError,switchMap,map } from 'rxjs/operators';
import { TdSearchBoxComponent } from '@covalent/core';

import { API } from '../../../service/api/api';

import { SearchService } from '../../../service/search/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  @ViewChild('searchBar') searchBar: TdSearchBoxComponent;

  searchInputTerm = new Subject<string>();
  complete: Observable<Array<any>>;
  results = [];

  constructor(public searchService: SearchService,
              public router: Router) { }

  ngOnInit() {
  	this.updateSearch();
  }

  updateSearch(): void {
    this.complete = this.searchInputTerm.pipe(debounceTime(300))
    .pipe(switchMap(query => query ?
        this.searchService.searchMulti(query, 1)
          .pipe(map(response =>
            response['results'].sort((a, b) => b['popularity'] - a['popularity']))) : of<Array<any>>([])))     
      .pipe(tap(response => {
        this.results = response;
      }));
  }

  search(event: string): void {
    this.searchInputTerm.next(event);
  }

  clear() {
    this.searchBar.value = '';
    this.searchInputTerm.next('');
    if (this.searchBar.searchVisible) {
      this.searchBar.toggleVisibility();
    }
  }

  onEnter() {
    const query = this.searchBar.value;
    if (query && query.length > 0) {
      this.clear();
      this.router.navigate(['/search', 'movie', {'query': query, 'page': 1}]);
    }
  }

  onFocusOut() {
    this.searchInputTerm.next('');
  }

}

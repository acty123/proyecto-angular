import {Component, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import { IPageChangeEvent, TdPagingBarComponent } from '@covalent/core';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs';

import { API } from '../../service/api/api';
import { MOVIE_GENRES } from '../../service/api/genres';

import { SearchService } from '../../service/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;

  // Used for responsive services
  columns: number;
  columnsPeople: number;
  _querySubscription: Subscription;
  ready = false;

  // search
  media = 'movie';
  query = '';

  // Used for the pagination
  firstLast = true;
  totalPages: number;
  totalResults: number;
  totalMovies = 0;
  totalSeries = 0;
  totalPeople = 0;
  currentPage = 1;

  results = [];
  url_image = API.apiImg + 'w500';
  apiImgOrig = API.apiImg + 'original';

  constructor(public searchService: SearchService,
              public route: ActivatedRoute,
              public router: Router,
              public _mediaService: TdMediaService,
              public _ngZone: NgZone) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      this.ready = false;
      if (params['media']) {
        this.media = params['media'];
      } else {
        this.media = 'movie';
      }
      if (params['query']) {
        this.query = params['query'];
      } else {
        this.query = '';
      }
      if (params['page']) {
        this.currentPage = params['page'];
      } else {
        this.currentPage = 1;
      }
      this.columns=4;
      this.columnsPeople=5;
      this.updateSearchResults();
    });
  }

   // updates search results according to query term and media type
  updateSearchResults(): void {
    if (this.query !== '') {
      switch (this.media) {
        case 'movie': {
          this.searchService.searchMovies(this.query, this.currentPage).subscribe(response => {
            this.results = response['results'];
            console.log(this.results);
            this.totalMovies = response['total_results'] <= 20000 ? response['total_results'] : 20000;
            this.totalResults = this.totalMovies;
            this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
            this.ready = true;
          });
          this.searchService.searchPeople(this.query, this.currentPage).subscribe(response => {
            this.totalPeople = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          });
        }
          break;
        case 'person': {
          this.searchService.searchPeople(this.query, this.currentPage).subscribe(response => {
            this.results = response['results'];
            this.totalPeople = response['total_results'] <= 20000 ? response['total_results'] : 20000;
            this.totalResults = this.totalPeople;
            this.totalPages = response['total_pages'] <= 1000 ? response['total_pages'] : 1000;
            this.ready = true;
          });
          this.searchService.searchMovies(this.query, this.currentPage).subscribe(response => {
            this.totalMovies = response['total_results'] <= 20000 ? response['total_results'] : 20000;
          });
        }
      }
    } else {
      this.results = [];
      this.ready = true;
    }
  }

  changePage(event: IPageChangeEvent): void {
    this.currentPage = event.page;
    this.router.navigate(['/search', this.media, {'query': this.query, 'page': this.currentPage}]);
  }

  onMoviesClick() {
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    }
    if (this.media !== 'movie') {
      this.router.navigate(['/search', 'movie', {'query': this.query, 'page': 1}]);
    }
  }

  onPeopleClick() {
    if (this.pagingBar) {
      this.pagingBar.navigateToPage(1);
    }
    if (this.media !== 'person') {
      this.router.navigate(['/search', 'person', {'query': this.query, 'page': 1}]);
    }
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

}

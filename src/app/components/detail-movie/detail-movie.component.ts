import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../service/movies/movies.service';
import { API } from '../../service/api/api';
import { MOVIE_GENRES } from '../../service/api/genres';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent implements OnInit, OnDestroy {

  _querySubscription: Subscription;
  movie = [];
  apiImgOrig = API.apiImg + 'original';
  apiImgBack = API.apiImg + 'w500';

  crew = [];
  creditsObservable: Observable<any[]>;

  routes: Object[] = [
    {
      title: 'Images',
      value: '1',
      icon: 'image',
    }, {
      title: 'Videos',
      value: '2',
      icon: 'video_library',
    }, {
      title: 'Cast',
      value: '3',
      icon: 'people',
    },
    {
      title: 'Reviews',
      value: '4',
      icon: 'comment',
    },
    {
      title: 'Recommendations',
      value: '5',
      icon: 'movie',
    },
  ];

  currentTab = 1;
  

  constructor(public moviesService: MoviesService,
              public router: Router,
              public route: ActivatedRoute,
              public _ngZone: NgZone,
              ) { }

  ngOnInit() {
  	this.route.params.subscribe(() => {
      this.updateMovieDetails();
    });
  }

  updateMovieDetails(): void {
    this.route.params.pipe(switchMap((params: Params)=> this.moviesService.getMovieDetails(params['id'])))
      .subscribe(response => {
        this.movie = response;
        this.updateCredits();
      });
  }

  updateCredits(): void {
    this.creditsObservable = this.route.params.pipe(switchMap((params: Params) => this.moviesService
        .getMovieCredits(params['id'])));
    this.creditsObservable
      .subscribe(response => {
        this.crew = response['crew'];
      }, err => {
        console.log(err);
      });
  }

  getGenres(genres: Array<any>): string {
    let names = '';
    if (genres) {
      for (let i = 0; i < genres.length - 1; i++) {
        names += genres[i]['name'] + ', ';
      }
      names += genres[genres.length - 1]['name'];
    }
    return names;
  }

  changeTab(tab: number): void {
    this.currentTab = tab;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }
}

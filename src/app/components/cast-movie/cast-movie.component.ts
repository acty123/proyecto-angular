import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../service/movies/movies.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { Observable,Subscription } from 'rxjs';	
import { switchMap } from 'rxjs/operators';
import { API } from '../../service/api/api';
import { MOVIE_GENRES } from '../../service/api/genres';

@Component({
  selector: 'app-cast-movie',
  templateUrl: './cast-movie.component.html',
  styleUrls: ['./cast-movie.component.scss']
})
export class CastMovieComponent implements OnInit {

  columns: number;
  _querySubscription: Subscription;

  movieCast = [];
  apiImg = API.apiImg + 'w500';

  constructor(public moviesService: MoviesService,
              public route: ActivatedRoute,
              public _ngZone: NgZone) { }

  ngOnInit() {
  	this.updateMovieCast();
  }

  updateMovieCast(): void {
    this.route.params.pipe(switchMap((params: Params) => this.moviesService
      .getMovieCredits(params['id'])))
      .subscribe(response => {
        this.movieCast = response['cast'].slice(0, 20);
      }, err => {
        console.log(err);
      });
  }

}

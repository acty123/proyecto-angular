import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PeopleService } from '../../service/people/people.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { API } from '../../service/api/api';
import { MOVIE_GENRES } from '../../service/api/genres';

@Component({
  selector: 'app-person-movies',
  templateUrl: './person-movies.component.html',
  styleUrls: ['./person-movies.component.scss']
})
export class PersonMoviesComponent implements OnInit, OnDestroy {

  columns: number;
  _querySubscription: Subscription;

  movies = [];

  apiImg = API.apiImg + 'w500';

  constructor(public peopleService: PeopleService,
              public route: ActivatedRoute,
              public _ngZone: NgZone,) { }

  ngOnInit(): void {
    this.updatePersonMovies();
  }

   updatePersonMovies(): void {
    this.route.params.pipe(switchMap((params: Params) => this.peopleService
      .getPersonMovies(params['id'])))
      .subscribe(response => {
        if (response['cast'].length >= response['crew'].length) {
          this.movies = response['cast'];
        } else {
          this.movies = response['crew'];
        }
        this.movies = this.movies.sort((a, b) => b['popularity'] - a['popularity']).slice(0, 20);
      }, err => {
        console.log(err);
      });
  }

  getCharacter(result: any): string {
    let character = '';
    if (result['character']) {
      character = 'as ' + result['character'];
    } else if (result['job']) {
      character = 'as ' + result['job'];
    }
    return character;
  }

  ngOnDestroy(): void {
    if (this._querySubscription) {
      this._querySubscription.unsubscribe();
    }
  }

}

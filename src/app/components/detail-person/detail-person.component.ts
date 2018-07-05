import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { PeopleService } from '../../service/people/people.service';
import { API } from '../../service/api/api';
import { MOVIE_GENRES } from '../../service/api/genres';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-person',
  templateUrl: './detail-person.component.html',
  styleUrls: ['./detail-person.component.scss']
})
export class DetailPersonComponent implements OnInit, OnDestroy {

  _querySubscription: Subscription;

  apiImgOrig = API.apiImg + 'original';
  apiImgBack = API.apiImg + 'w1400_and_h450_bestv2';
  apiImgProf = API.apiImg + 'w500';
  person = [];
  gender: string;
  featuredCredit: object;
  currentTab = 1;

  constructor(public peopleService: PeopleService,
              public router: Router,
              public route: ActivatedRoute,
              public _ngZone: NgZone) { }

  ngOnInit() {
  	this.updatePersonDetails();
  }

  updatePersonDetails(): void {
    this.route.params.pipe(switchMap((params: Params) => this.peopleService
      .getPersonDetails(params['id'])))
      .subscribe(response => {
        this.person = response;
        this.gender = '-';
        if (response['gender'] === 1) {
          this.gender = 'Female';
        } else if (response['gender'] === 2) {
          this.gender = 'Male';
        } else {
          this.gender = '';
        }
        this.updateFeaturedCredit();
      }, err => {
        if (err['status'] === 404) {
          this.router.navigate(['/404']);
        }
        console.log(err);
        this.person = [];
      });
  }

  updateFeaturedCredit(): void {
    this.route.params.pipe(switchMap((params: Params) => this.peopleService
      .getPersonCombinedCredits(params['id'])))
      .subscribe(response => {
        this.featuredCredit = response['cast'].sort((a, b) => b['popularity'] - a['popularity'])[0];
      }, err => {
        console.log(err);
      });
  }

  getAge(dateString: string): number {
    const date1 = Date.parse(dateString);
    const date2 = Date.now();
    const millis = date2 - date1;
    if (millis > 0) {
      return Math.trunc(millis / (1000 * 60 * 60 * 24 * 365));
    } else {
      return 0;
    }
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

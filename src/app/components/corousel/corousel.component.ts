import { Component, NgZone, OnInit } from '@angular/core';
import { MoviesService } from '../../service/movies/movies.service';
import { API } from '../../service/api/api';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.scss'],
  providers: [ NgbCarouselConfig ]
})
export class CorouselComponent implements OnInit {

  movies = [];

  apiImg = API.apiImg + 'w1280';

  constructor(public moviesService: MoviesService,
  			  private carouselConfig: NgbCarouselConfig,
              public _ngZone: NgZone) { 
  	carouselConfig.interval = 3000;
  }

  ngOnInit():void {
  	this.updateMovies(1);
  }

  updateMovies(page: number): void {
    this.moviesService.getPopularMovies(page).subscribe(response => {
      this.movies = response['results'].slice(0, 10).filter(a => a['backdrop_path']);
    });
  }


}

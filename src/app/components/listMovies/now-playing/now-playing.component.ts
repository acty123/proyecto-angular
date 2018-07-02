import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../service/movies/movies.service';
import { API } from '../../../service/api/api';
import {ActivatedRoute, Router} from '@angular/router';
import {IPageChangeEvent} from '@covalent/core';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  now_playing: any[];
  url_image=API.apiImg;
  position: string = 'right';
  eventLinks: IPageChangeEvent;
  page: number = 1;
  totalPages: number;
  totalResults: number;

  constructor(
  	private listMovies: MoviesService, 
  	private route: ActivatedRoute,
  	private router: Router
  	) { }

  ngOnInit() {
  	this.page = +this.route.snapshot.paramMap.get('page');
  	this.getNowPlaying();
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
    this.page = this.eventLinks.page;
    this.router.navigate(['now_playing', this.page]);
    this.getNowPlaying();
  }

  getNowPlaying () {
    this.listMovies.getNowPlayingMovies(this.page).subscribe(
    	(movies: any) => {
    		this.now_playing = movies.results;
    		this.totalPages = movies.total_pages; 
    		this.totalResults = movies['total_results'] <= 20000 ? movies['total_results'] : 20000;
    	} 
    	);
  }

}

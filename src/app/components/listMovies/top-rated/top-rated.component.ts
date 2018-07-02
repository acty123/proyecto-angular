import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../service/movies/movies.service';
import { API } from '../../../service/api/api';
import {ActivatedRoute, Router} from '@angular/router';
import {IPageChangeEvent} from '@covalent/core';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {

  top_rated: any[];
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
  	this.getTopRated();
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
    this.page = this.eventLinks.page;
    this.router.navigate(['top_rated', this.page]);
    this.getTopRated();
  }

  getTopRated () {
    this.listMovies.getTopRatedMovies(this.page).subscribe(
    	(movies: any) => {
    		this.top_rated = movies.results;
    		this.totalPages = movies.total_pages; 
    		this.totalResults = movies['total_results'] <= 20000 ? movies['total_results'] : 20000;
    	} 
    	);
  }

}

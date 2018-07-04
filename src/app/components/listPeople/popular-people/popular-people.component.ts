import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../service/people/people.service';
import { API } from '../../../service/api/api';
import {ActivatedRoute, Router} from '@angular/router';
import {IPageChangeEvent} from '@covalent/core';


@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss']
})
export class PopularPeopleComponent implements OnInit {

  popular: any[];
  url_image=API.apiImg;
  position: string = 'right';
  eventLinks: IPageChangeEvent;
  page: number = 1;
  totalPages: number;
  totalResults: number;

  constructor(private listPeople: PeopleService, 
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.page = +this.route.snapshot.paramMap.get('page');
  	this.getPopularPeople();
  }

  changeLinks(event: IPageChangeEvent): void {
    this.eventLinks = event;
    this.page = this.eventLinks.page;
    this.router.navigate(['people', this.page]);
    this.getPopularPeople();
  }

  getPopularPeople () {
    this.listPeople.getPopularPeople(this.page).subscribe(
    	(people: any) => {
    		this.popular = people.results;
    		this.totalPages = people.total_pages; 
    		this.totalResults = people['total_results'] <= 20000 ? people['total_results'] : 20000;
    	} 
    	);
  }

}

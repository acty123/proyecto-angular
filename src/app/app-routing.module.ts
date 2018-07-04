import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PopularComponent } from './components/listMovies/popular/popular.component';
import { UpcomingComponent } from './components/listMovies/upcoming/upcoming.component';
import { NowPlayingComponent } from './components/listMovies/now-playing/now-playing.component';
import { TopRatedComponent } from './components/listMovies/top-rated/top-rated.component';
import { DetailMovieComponent } from './components/detail-movie/detail-movie.component';
import { PopularPeopleComponent } from './components/listPeople/popular-people/popular-people.component';
import { DetailPersonComponent } from './components/detail-person/detail-person.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes=[
	//{path: '', redirectTo: '/popular/1', pathMatch: 'full'},
	{path: 'popular/:page', component: PopularComponent},
	{path: 'upcoming/:page', component: UpcomingComponent},
	{path: 'now_playing/:page', component: NowPlayingComponent},
	{path: 'top_rated/:page', component: TopRatedComponent},
	{path: 'people/:page', component: PopularPeopleComponent},
	{path: 'movie/:id', component: DetailMovieComponent},
	{path: 'person/:id', component: DetailPersonComponent},
	{path: 'search/:media', component: SearchComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
})
export class AppRoutingModule { }

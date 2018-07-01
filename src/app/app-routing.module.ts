import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PopularComponent } from './components/listMovies/popular/popular.component';


const routes: Routes=[
	//{path: '', redirectTo: '/popular/1', pathMatch: 'full'},
	{path: 'popular/:page', component: PopularComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
})
export class AppRoutingModule { }

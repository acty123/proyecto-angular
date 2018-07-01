import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';   

import {RouterModule, Routes} from '@angular/router';
import {MatGridListModule, MatCardModule, MatTooltipModule, MatTabsModule,
  MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatDialogModule,
  MatChipsModule, MatMenuModule} from '@angular/material';
import { CovalentCommonModule, CovalentLayoutModule, CovalentPagingModule, CovalentSearchModule } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';

import {FlexLayoutModule} from '@angular/flex-layout';

//components
import { AppComponent } from './app.component';

import { PopularComponent } from './components/listMovies/popular/popular.component';

import { AppRoutingModule } from './app-routing.module';

//service
import { MoviesService } from './service/movies/movies.service';


@NgModule({
  declarations: [
    AppComponent,
    PopularComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    NoopAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule
  ],
  providers: [
    MoviesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

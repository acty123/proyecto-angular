import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchUrl= API.apiUrl + '3/search'

  constructor(private http:Http) { }

  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + '&language=en-US' + args);
    return this.http.get(url).pipe(map(response => response.json()));
  }

  searchMulti(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/multi';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

  searchPeople(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/person';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

  searchMovies(query: string, page: number): Observable<any> {
    const url = this.searchUrl + '/movie';
    const args = '&page=' + page +
      '&query=' + query +
      '&include_adult=false';
    return this.sendRequest(url, args);
  }

}

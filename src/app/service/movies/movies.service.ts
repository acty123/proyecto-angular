import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

	moviesUrl = API.apiUrl + '3/movie';

  constructor(private http: HttpClient) { }

   // sends request to API backend
  sendRequest(url: string, args = ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + args);
    return this.http.get(url);
  }

  getPopularMovies(page: number): Observable<any> {
    const url = this.moviesUrl + '/popular';
    const args = '&page=' + page + '&language=en-US';
    return this.sendRequest(url, args);
  }

}

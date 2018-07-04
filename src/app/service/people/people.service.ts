import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  peopleUrl = API.apiUrl + '3/person';

  constructor(private http: HttpClient) { }

  sendRequest(url: string, args= ''): Observable<any> {
    url += ('?api_key=' + API.apiKey + args);
    return this.http.get(url);
  }

  getPopularPeople(page: number): Observable<any> {
    const url = this.peopleUrl + '/popular';
    const args = '&page=' + page;
    return this.sendRequest(url, args);
  }

  getPersonDetails(id: number): Observable<any> {
    const url = this.peopleUrl + '/' + id;
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }

  getPersonMovies(id: number): Observable<any> {
    const url = this.peopleUrl + '/' + id + '/movie_credits';
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }

  getPersonCombinedCredits(id: number): Observable<any> {
    const url = this.peopleUrl + '/' + id + '/combined_credits';
    const args = '&language=en-US';
    return this.sendRequest(url, args);
  }
}

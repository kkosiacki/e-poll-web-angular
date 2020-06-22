import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Poll, Vote } from './poll.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor(private http: HttpClient) { }

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(environment.url + 'api/polls?filter[status]=active');
  }

  getPoll(slug: string): Observable<Poll> {
    return this.http.get<Poll>(environment.url + 'api/polls/' + slug);
  }


  sendVote(vote: Vote) {
    const votes = [vote];
    return this.http.post(environment.url + 'api/votes',{votes: votes},{ responseType: 'blob' });
  }
}

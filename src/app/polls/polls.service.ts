import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Poll, Vote } from './poll.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollsService implements Resolve<Poll[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Poll[]> {
    return this.http.get<Poll[]>(environment.url + 'api/polls?filter[status]=active');
  }


  sendVote(vote: Vote) {
    const votes = [vote];
    return this.http.post(environment.url + 'api/votes',{votes: votes},{ responseType: 'blob' });
  }
}

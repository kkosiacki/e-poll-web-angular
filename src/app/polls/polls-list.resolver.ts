import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PollsService } from './polls.service';
import { Poll } from './poll.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PollsListResolver implements Resolve<Poll[]> {

    constructor(private service: PollsService) { }
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Poll[]> {
      return this.service.getPolls();
    }
  
  
    
  }
  
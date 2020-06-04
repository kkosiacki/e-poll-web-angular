import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from './result.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService implements Resolve<Result[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result[]> {

    return this.http.get<Result[]>(environment.url + 'api/results/' + route.params.slug);
  }

}

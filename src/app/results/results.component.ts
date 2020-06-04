import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { from } from 'rxjs/internal/observable/from';
import { Result, ChartKey, ChartValue } from './result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public results: Map<string, ChartValue[]>;
  public poll:string;
  constructor(private route: ActivatedRoute) {
    this.results = new Map();
   }

  ngOnInit() {
      this.route.data
        .subscribe(data => {
            data.results.forEach(t => {
              this.poll = t.poll;
              const key = t.question;
              const value = new ChartValue(t);
              if(this.results.has(key)){
                this.results.get(key).push(value);
              } else {
                this.results.set(key, [value]);
              }
            });

        });
  }

}

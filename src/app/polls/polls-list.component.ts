import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from './poll.model';


@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.scss']
})
export class PollsListComponent implements OnInit {

  public polls: Poll[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
       .subscribe(t => {
         this.polls = t.polls.data;
       });
  }

}

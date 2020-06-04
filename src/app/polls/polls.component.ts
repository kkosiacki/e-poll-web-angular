import { PollDialogComponent } from './poll-dialog.component';
import { PollsService } from './polls.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll, Question, Vote } from './poll.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  public polls: Poll[] = [];
  public votes: Vote[] = [];
  public accordionStates: number[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private pollService: PollsService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data
      .subscribe(t => {
        this.polls = t.polls.data;
        // for accordion states
        this.polls.forEach(poll => {
          this.accordionStates.push(-1);
          this.votes.push(new Vote(poll));
        });
      });
  }

  nextQuestion(index: number, question: number) {
    this.accordionStates[index] = question + 1;
  }

  prevQuestion(index: number, question: number) {
    this.accordionStates[index] = question - 1;
  }

  setQuestion(index: number, question: number) {
      this.accordionStates[index] = question;
      this.votes[index].clearValid();
  }


  openSummary(index: number) {
    if (this.votes[index].checkValid()) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.votes[index];

      this.dialog.open(PollDialogComponent, dialogConfig).afterClosed().subscribe(t => {
      if (t) {
          this.pollService.sendVote(this.votes[index]).subscribe(t => {
            FileSaver.saveAs(t);
            this.snackBar.open("Dziękujemy za Twój głos",'OK', {duration : 3000})
              .afterDismissed().subscribe( () => this.router.navigate(['/results',this.polls[index].slug]) );
          });
        }
      });
    }
  }

  handleSingleAnswerChange(poll_i: number, question_i: number, event: MatRadioChange) {
    this.votes[poll_i].clearValid();
    this.votes[poll_i].questions[question_i].addAnswer(event.value);
  }

  handleMultiAnswerChange(poll_i: number, question_i: number, event: MatSlideToggleChange, value: string) {
    this.votes[poll_i].clearValid();
    if (event.checked) {
      this.votes[poll_i].questions[question_i].addAnswer(value);
    } else {
      this.votes[poll_i].questions[question_i].removeAnswer(value);
    }
  }

}



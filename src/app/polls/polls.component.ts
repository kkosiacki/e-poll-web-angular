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

  public poll: Poll;
  public vote: Vote;
  public accordionStates: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private pollService: PollsService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
     this.route.data
       .subscribe(t => {
         console.log(t);
         console.log(t.poll);
         this.poll = t.poll.data;
            // for accordion states
         this.vote = new Vote(this.poll);
       });
  }

  nextQuestion(question: number) {
    this.accordionStates = question + 1;
  }

  prevQuestion(question: number) {
    this.accordionStates = question - 1;
  }

  setQuestion(question: number) {
      this.accordionStates = question;
      this.vote.clearValid();
  }


  openSummary() {
    if (this.vote.checkValid()) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.vote;

      this.dialog.open(PollDialogComponent, dialogConfig).afterClosed().subscribe(t => {
      if (t) {
          this.pollService.sendVote(this.vote).subscribe(t => {
            FileSaver.saveAs(t);
            this.snackBar.open("Dziękujemy za Twój głos",'OK', {duration : 3000})
              .afterDismissed().subscribe( () => this.router.navigate(['/results',this.poll.slug]) );
          });
        }
      });
    }
  }

  handleSingleAnswerChange(question_i: number, event: MatRadioChange) {
    this.vote.clearValid();
    this.vote.questions[question_i].addAnswer(event.value);
  }

  handleMultiAnswerChange(question_i: number, event: MatSlideToggleChange, value: string) {
    this.vote.clearValid();
    if (event.checked) {
      this.vote.questions[question_i].addAnswer(value);
    } else {
      this.vote.questions[question_i].removeAnswer(value);
    }
  }

}



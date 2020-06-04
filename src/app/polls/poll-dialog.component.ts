import { Vote } from './poll.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-poll-dialog',
  template: `
  <h2 mat-dialog-title>Twój głos</h2>
    {{ vote | json}}
    <br><br>
    I jakas głupia instrukcja co dalej :)
    <mat-dialog-actions>
        <button class="mat-raised-button mat-primary"(click)="save()">Głosuje</button>
        <span style="flex: 1 1 auto;"></span>
        <button mat-button color="warn" (click)="close()">Anuluj</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class PollDialogComponent implements OnInit {

  public vote: Vote

  constructor( private dialogRef: MatDialogRef<PollDialogComponent>,
               @Inject(MAT_DIALOG_DATA) data) {this.vote = data; }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.vote);
}

close() {
    this.dialogRef.close(false);
}

}

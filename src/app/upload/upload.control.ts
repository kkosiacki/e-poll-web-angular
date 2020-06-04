import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';


@Component({
  selector: 'app-upload',
  template: `
    <mat-card style='margin-right:2em;margin-left:2em'>
      <mat-card-title>Upload pliku podpisanego: </mat-card-title>
      <mat-card-content>
        <file-upload [multiple]="false" [control]="fileUploadControl"></file-upload>
      </mat-card-content>
      <mat-card-actions>
        <button [disabled]="fileUploadControl.invalid || fileUploadControl.size ==0" mat-raised-button color="primary" (click)= "upload()">Dodaj mój głos</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
  ]
})
export class UploadControl implements OnInit {
  public fileUploadControl = new FileUploadControl([FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['text/xml'])]);


  constructor(private http: HttpClient, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  upload() {
    let formData = new FormData();
    formData.set('file',this.fileUploadControl.value[0]);
    this.http.post<any>(environment.url + 'api/verify', formData
  ).subscribe(
    t => {
      this.matSnackBar.open("Dziękujemy za oddany głos... Pesel " + t.data.pesel + " został zarejestrowany")
    },
    err => {
      console.log(err.error.errors.file[0]);
      this.matSnackBar.open(err.error.errors.file[0]);
    });
  }
}

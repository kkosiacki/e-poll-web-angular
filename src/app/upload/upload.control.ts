import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { timer } from 'rxjs/internal/observable/timer';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.control.html',
  styleUrls: ['./upload.control.scss']
})
export class UploadControl implements OnInit {
  public fileUploadControl = new FileUploadControl([FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['text/xml'])]).setListVisibility(false);


  constructor(private http: HttpClient, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  upload() {
    let formData = new FormData();
    formData.set('file',this.fileUploadControl.value[0]);
    //this.http.post<any>(environment.url + 'api/verify', formData)
    timer(4000)
  .subscribe(
    t => {
      this.matSnackBar.open("Dziękujemy za oddany głos... Pesel ");// + t.data.pesel + " został zarejestrowany")
    },
    err => {
      console.log(err.error.errors.file[0]);
      this.matSnackBar.open(err.error.errors.file[0]);
    });
  }
}

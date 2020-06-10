import { environment } from './../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.control.html',
  styleUrls: ['./upload.control.scss']
})
export class UploadControl implements OnInit {
  public fileUploadControl = new FileUploadControl([FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['text/xml'])]).setListVisibility(false);
  public filesStatus: Map<string, string> = new Map();

  constructor(private http: HttpClient, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  removeFile(file: File) {
    this.fileUploadControl.removeFile(file);
  }

  isLoading(file: File) {
    return this.filesStatus.has(file.name) && this.filesStatus.get(file.name) === 'loading';
  }

  isUploaded(file: File) {
    return this.filesStatus.has(file.name) && this.filesStatus.get(file.name) === 'uploaded';
  }
  isError(file:File) {
    return this.filesStatus.has(file.name) && this.filesStatus.get(file.name).startsWith('error');
  }

  upload(file: File) {
    this.filesStatus.set(file.name,'loading');
    let formData = new FormData();
    formData.set('file', file);
    this.http.post<any>(environment.url + 'api/verify', formData)
    .subscribe(
    t => {
      this.matSnackBar.open("Dziękujemy za oddany głos... Pesel " + t.data.pesel + " został zarejestrowany", '', {duration: 2000});
      this.filesStatus.set(file.name,'uploaded');
    },
    err => {
      console.log(err.error);
      let msg = '';
      if(err.error.errors && err.error.errors.file[0]) {
        msg =err.error.errors.file[0];
      } else {
        msg = err.error.message;
      }
      this.filesStatus.set(file.name,'error:'+ msg);
      this.matSnackBar.open(msg, '', {duration: 2000});
    });
  }
}

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UploadControl } from './upload/upload.control';



@NgModule({
  declarations: [UploadControl],
  imports: [
    CommonModule,
    MatCardModule,
    FileUploadModule,
    MatButtonModule,
    MatSnackBarModule,

  ],
  exports: [MatCardModule, MatButtonModule, UploadControl]
})
export class SharedModule { }

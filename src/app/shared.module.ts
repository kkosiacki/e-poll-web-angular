import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
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
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule

  ],
  exports: [MatCardModule, MatButtonModule, MatIconModule, UploadControl]
})
export class SharedModule { }

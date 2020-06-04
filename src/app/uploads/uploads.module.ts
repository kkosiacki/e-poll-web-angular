import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadsComponent } from './uploads.component';


@NgModule({
  declarations: [UploadsComponent],
  imports: [
    CommonModule,
    UploadsRoutingModule,
    SharedModule
  ]
})
export class UploadsModule { }

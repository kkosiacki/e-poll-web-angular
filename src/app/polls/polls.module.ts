import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PollsRoutingModule } from './polls-routing.module';
import { PollsComponent } from './polls.component';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PollDialogComponent } from './poll-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PollsListComponent } from './polls-list.component';
import { MatListModule } from '@angular/material/list';




@NgModule({
  declarations: [PollsComponent, PollDialogComponent, PollsListComponent],
  imports: [
    CommonModule,
    PollsRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    SharedModule
  ],
  entryComponents: [PollDialogComponent]
})
export class PollsModule { }

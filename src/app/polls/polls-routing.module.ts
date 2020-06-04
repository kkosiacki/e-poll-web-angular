import { PollsService } from './polls.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { PollsComponent } from './polls.component';

const routes: Routes = [{ path: '', component: PollsComponent, resolve: {polls: PollsService}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollsRoutingModule { }

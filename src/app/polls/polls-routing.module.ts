import { PollsService } from './polls.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';
import { PollsComponent } from './polls.component';
import { PollsListComponent } from './polls-list.component';
import { PollsListResolver } from './polls-list.resolver';
import { PollsResolver } from './polls.resolver';

const routes: Routes = [{ path: '', component: PollsListComponent, resolve: {polls: PollsListResolver}},
{ path: ':poll', component: PollsComponent, resolve: {poll: PollsResolver}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollsRoutingModule { }

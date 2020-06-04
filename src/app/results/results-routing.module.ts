import { ResultService } from './result.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsComponent } from './results.component';

const routes: Routes = [{ path: ':slug', component: ResultsComponent, resolve: {results: ResultService} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }

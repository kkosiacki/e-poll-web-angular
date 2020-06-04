import { PollsComponent } from './polls/polls.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/polls', pathMatch: 'full' },
  { path: 'polls', loadChildren: () => import('./polls/polls.module').then(m => m.PollsModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'results', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule) },
  { path: 'upload', loadChildren: () => import('./uploads/uploads.module').then(m => m.UploadsModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'scoreboard', loadChildren: () => import('./scoreboard/scoreboard.module').then(m => m.ScoreboardModule) },
  { path: '**', redirectTo: "/scoreboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

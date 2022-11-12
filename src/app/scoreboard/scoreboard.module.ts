import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';
import { PointPipe } from './point.pipe';


@NgModule({
  declarations: [
    ScoreboardComponent,
    PointPipe
  ],
  imports: [
    CommonModule,
    ScoreboardRoutingModule
  ]
})
export class ScoreboardModule { }

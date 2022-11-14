import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreboardRoutingModule } from './scoreboard-routing.module';
import { ScoreboardComponent } from './scoreboard.component';
import { PointPipe } from './point.pipe';
import { StoreModule } from '@ngrx/store';
import { matchFeatureKey, matchReducer } from './match.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MatchEffects } from './match.effects';


@NgModule({
  declarations: [
    ScoreboardComponent,
    PointPipe
  ],
  imports: [
    CommonModule,
    ScoreboardRoutingModule,
    StoreModule.forFeature(matchFeatureKey, matchReducer),
    EffectsModule.forFeature([MatchEffects])
  ]
})
export class ScoreboardModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchEffects } from './scoreboard/match.effects';
import { matchReducer } from './scoreboard/match.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ match: matchReducer }),
    EffectsModule.forRoot([MatchEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

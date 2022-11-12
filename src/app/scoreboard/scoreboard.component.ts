import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { point } from './match.actions';
import { State } from './match.reducer';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  match$!: Observable<State>;
  matchOver$!: Observable<boolean>;
  p0Serve$!: Observable<boolean>;
  isTiebreak$!: Observable<boolean>;

  constructor(private store: Store<{match: State}>) { }

  ngOnInit(): void {
    this.match$ = this.store.select(({match}) => match);
    this.matchOver$ = this.match$.pipe(
      map(({players: [{sets: p0Sets}, {sets: p1Sets}]}) => p0Sets === 2 || p1Sets === 2)
    );
    this.p0Serve$ = this.match$.pipe(
      map(({p0Serve}) => p0Serve)
    );
    this.isTiebreak$ = this.match$.pipe(
      map(({players: [{games: p0Games}, {games: p1Games}]}) => p0Games+p1Games === 12)
    );
  }

  winPoint(winner: number) {
    this.store.dispatch(point({winner: winner}))
  }

}

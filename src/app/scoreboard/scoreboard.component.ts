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
  winner$!: Observable<boolean>;

  constructor(private store: Store<{match: State}>) { }

  ngOnInit(): void {
    this.match$ = this.store.select(({match}) => match);
    this.winner$ = this.match$.pipe(
      map(({winner}) => winner ? true : false)
    );
  }

  winPoint(winner: number) {
    this.store.dispatch(point({winner: winner}))
  }

}
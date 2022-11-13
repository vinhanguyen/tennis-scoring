import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { load, point, reset, setMaxSets } from './match.actions';
import { State } from './match.reducer';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  match$!: Observable<State>;
  maxSets$!: Observable<number>;
  winner$!: Observable<number>;

  constructor(private store: Store<{match: State}>) { }

  ngOnInit(): void {
    this.match$ = this.store.select(({match}) => match);
    this.maxSets$ = this.store.select(({match: {maxSets}}) => maxSets);
    this.winner$ = this.store.select(({match: {winner}}) => winner);
    
    this.store.dispatch(load());
  }

  winPoint(winner: number) {
    this.store.dispatch(point({winner}));
  }

  promptMaxSets() {
    const maxSets = prompt('Play 1, 3, 5 set match?');
    if (maxSets && maxSets.match(/1|3|5/)) {
      this.store.dispatch(setMaxSets({maxSets: Number(maxSets)}));
    }
  }

  confirmReset() {
    const ok = confirm('Are you sure?');
    if (ok) {
      this.store.dispatch(reset());
    }
  }

}

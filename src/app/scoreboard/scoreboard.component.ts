import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { load, point, reset, setMaxSets } from './match.actions';
import { State } from './match.reducer';
import { selectMatch, selectMaxSets, selectWinner } from './match.selectors';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  match$!: Observable<State>;
  maxSets$!: Observable<number>;
  winner$!: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.match$ = this.store.select(selectMatch);
    this.maxSets$ = this.store.select(selectMaxSets);
    this.winner$ = this.store.select(selectWinner);
    
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

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concatMap, map, of, tap, withLatestFrom } from "rxjs";
import { point, doNothing, game, set, match, tiebreak, load, loadSuccess, reset, coinToss, coinTossResult, setMaxSets } from "./match.actions";
import { State } from "./match.reducer";

@Injectable()
export class MatchEffects {

  point$ = createEffect(() =>
    this.actions$.pipe(
      ofType(point),
      concatMap(action => of(action).pipe(
        withLatestFrom(
          this.store.select(({match}) => match)
        ),
      )),
      map(([action, match]) => {
        const {points: [p1, p2], tiebreak} = match;

        if (tiebreak) {
          if (p1 >= 7 && p1-p2 >= 2) {
            return game({winner: 1});
          } else if (p2 >= 7 && p2-p1 >= 2) {
            return game({winner: 2});
          }
        } else {
          if (p1 >= 4 && p1-p2 >= 2) {
            return game({winner: 1});
          } else if (p2 >= 4 && p2-p1 >= 2) {
            return game({winner: 2});
          }
        }
        return doNothing();
      })
    )
  );

  game$ = createEffect(() =>
    this.actions$.pipe(
      ofType(game),
      concatMap(action => of(action).pipe(
        withLatestFrom(
          this.store.select(({match}) => match)
        ),
      )),
      map(([action, match]) => {
        const {games: [p1, p2]} = match;

        if (p1+p2 === 12) {
          return tiebreak();
        } else if (p1 === 7) {
          return set({winner: 1});
        } else if (p2 === 7) {
          return set({winner: 2});
        } else if (p1 >= 6 && p1-p2 >= 2) {
          return set({winner: 1});
        } else if (p2 >= 6 && p2-p1 >= 2) {
          return set({winner: 2});
        }
        return doNothing();
      })
    )
  );

  set$ = createEffect(() =>
    this.actions$.pipe(
      ofType(set),
      concatMap(action => of(action).pipe(
        withLatestFrom(
          this.store.select(({match: state}) => state)
        ),
      )),
      map(([action, state]) => {
        const {sets: [p1, p2], maxSets} = state;

        if (maxSets === 1) {
          if (p1 === 1) {
            return match({winner: 1});
          } else if (p2 === 1) {
            return match({winner: 2});
          }
        } else if (maxSets === 3) {
          if (p1 === 2) {
            return match({winner: 1});
          } else if (p2 === 2) {
            return match({winner: 2});
          }
        } else if (maxSets === 5) {
          if (p1 === 3) {
            return match({winner: 1});
          } else if (p2 === 3) {
            return match({winner: 2});
          }
        }

        return doNothing();
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMaxSets, coinTossResult, point, game, set, tiebreak),
      concatMap(action => of(action).pipe(
        withLatestFrom(
          this.store.select(({match}) => match)
        ),
      )),
      tap(([action, match]) => {
        localStorage.setItem('match', JSON.stringify(match));
      })
    ), {dispatch: false}
  );

  loadMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      map(() => {
        const match = localStorage.getItem('match');
        if (match) {
          return loadSuccess({match: JSON.parse(match)});
        }
        return doNothing();
      })
    )
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reset),
      tap(() => {
        localStorage.clear();
      })
    ), {dispatch: false}
  );

  setMaxSets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setMaxSets),
      map(() => coinToss())
    )
  );

  coinToss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(coinToss),
      map(() => {
        const result = Math.floor(Math.random()*2);

        return coinTossResult({result});
      })
    )
  );
 
  constructor(
    private actions$: Actions, 
    private store: Store<{match: State}>
  ) {}
}

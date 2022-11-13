import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concatMap, map, of, withLatestFrom } from "rxjs";
import { point, doNothing, game, set, match, tiebreak } from "./match.actions";
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

        if (p1 === 7) {
          return set({winner: 1});
        } else if (p2 === 7) {
          return set({winner: 2});
        } else if (p1 >= 6 && p1-p2 >= 2) {
          return set({winner: 1});
        } else if (p2 >= 6 && p2-p1 >= 2) {
          return set({winner: 2});
        } else if (p1+p2 === 12) {
          return tiebreak();
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
        const {sets: [p1, p2]} = state;

        if (p1 === 2) {
          return match({winner: 1});
        } else if (p2 === 2) {
          return match({winner: 2});
        }
        return doNothing();
      })
    )
  );
 
  constructor(
    private actions$: Actions, 
    private store: Store<{match: State}>
  ) {}
}
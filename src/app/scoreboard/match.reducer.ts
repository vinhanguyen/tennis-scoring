import { createReducer, on } from "@ngrx/store";
import { game, match, point, set, tiebreak } from "./match.actions";
import * as _ from 'lodash';

export interface State {
  points: number[],
  games: number[],
  sets: number[],
  setResults: number[][],
  server: number,
  winner: number,
  tiebreak: boolean,
  tiebreakServer: number,
}

export const initialState: State = {
  points: [0,0],
  games: [0,0],
  sets: [0,0],
  setResults: [],
  server: 1,
  winner: 0,
  tiebreak: false,
  tiebreakServer: 0,
};

export const matchReducer = createReducer(
  initialState,
  on(point, (prev, {winner}) => {
    const next = _.cloneDeep(prev);

    let {points: [p1, p2], tiebreak} = prev;

    if (winner === 1) {
      next.points = [p1+1, p2];
    } else {
      next.points = [p1, p2+1];
    }

    [p1, p2] = next.points;

    if (tiebreak && (p1+p2)%2 === 1) {
      next.server = prev.server === 1 ? 2 : 1;
    }
    
    return next;
  }),
  on(game, (prev, {winner}) => {
    const next = _.cloneDeep(prev);

    const [p1, p2] = prev.games;
    if (winner === 1) {
      next.games = [p1+1, p2];
    } else {
      next.games = [p1, p2+1];
    }

    next.points = [0,0];

    next.server = prev.server === 1 ? 2 : 1;
    
    return next;
  }),
  on(set, (prev, {winner}) => {
    const next = _.cloneDeep(prev);

    const {sets: [p1, p2], tiebreak, tiebreakServer} = prev;

    if (winner === 1) {
      next.sets = [p1+1, p2];
    } else {
      next.sets = [p1, p2+1];
    }

    next.games = [0,0];
    
    next.setResults.push(prev.games);

    if (tiebreak) {
      next.server = tiebreakServer === 1 ? 2 : 1;
      next.tiebreak = false;
      next.tiebreakServer = 0;
    }
    
    return next;
  }),
  on(match, (prev, {winner}) => {
    const next = _.cloneDeep(prev);

    next.winner = winner;

    next.sets = [0,0];
    next.server = 0;
    
    return next;
  }),
  on(tiebreak, (prev) => {
    const next = _.cloneDeep(prev);

    const {server} = prev;

    next.tiebreak = true;
    next.tiebreakServer = server;
    
    return next;
  }),
);
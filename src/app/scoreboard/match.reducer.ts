import { createReducer, on } from "@ngrx/store";
import { point } from "./match.actions";
import * as _ from 'lodash';

export interface Player {
  points: number,
  games: number,
  sets: number
}

export interface State {
  points: number[],
  players: Player[],
  p0Serve: boolean,
  sets: number[][],
  startedTb: number
}

export const initialState: State = {
  points: [],
  players: [
    {
      points: 0,
      games: 0,
      sets: 0
    },
    {
      points: 0,
      games: 0,
      sets: 0
    }
  ],
  p0Serve: true,
  sets: [],
  startedTb: -1
};

export const matchReducer = createReducer(
  initialState,
  on(point, (state, {winner}) => {
    const match = _.cloneDeep(state);

    match.points.push(winner);

    match.players[winner].points++;

    // update games
    const isTiebreak = match.players[0].games+match.players[1].games === 12;
    const pointsPlayed = match.players[0].points+match.players[1].points;
    let gameOver = false;

    if (isTiebreak) {
      if (match.startedTb === -1) {
        match.startedTb = match.p0Serve ? 0 : 1;
      }
      if (match.players[0].points >= 7 && match.players[0].points-match.players[1].points >= 2) {
        match.players[0].games++;
        gameOver = true;
      } else if (match.players[1].points >= 7 && match.players[1].points-match.players[0].points >= 2) {
        match.players[1].games++;
        gameOver = true;
      }

      if(pointsPlayed%2 === 1) { // odd
        match.p0Serve = !match.p0Serve;
      }
    } else {
      if (match.players[0].points >= 4 && match.players[0].points-match.players[1].points >= 2) {
        match.players[0].games++;
        gameOver = true;
      } else if (match.players[1].points >= 4 && match.players[1].points-match.players[0].points >= 2) {
        match.players[1].games++;
        gameOver = true;
      }
    }

    if (gameOver) {
      match.players[0].points = match.players[1].points = 0;
      match.p0Serve = !match.p0Serve;

      if (match.startedTb !== -1) {
        match.p0Serve = match.startedTb !== 0;
        match.startedTb = -1;
      }
    }

    // update sets
    const p0WinSet = match.players[0].games === 7 || (match.players[0].games === 6 && match.players[0].games-match.players[1].games >= 2);
    const p1WinSet = match.players[1].games === 7 || (match.players[1].games === 6 && match.players[1].games-match.players[0].games >= 2);
    let setOver = false;

    if (p0WinSet) {
      match.players[0].sets++;
      setOver = true;
    } else if (p1WinSet) {
      match.players[1].sets++;
      setOver = true;
    }

    if (setOver) {
      match.sets.push([match.players[0].games, match.players[1].games]);
      match.players[0].games = match.players[1].games = 0;
    }
    
    return match;
  }),
);
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { matchFeatureKey, State } from "./match.reducer";

export const selectMatch = createFeatureSelector<State>(matchFeatureKey);

export const selectWinner = createSelector(
  selectMatch,
  state => state.winner
);

export const selectMaxSets = createSelector(
  selectMatch,
  state => state.maxSets
);

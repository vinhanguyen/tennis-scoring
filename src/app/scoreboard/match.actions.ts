import { createAction, props } from "@ngrx/store";
import { State } from "./match.reducer";

export const point = createAction('[Match] Point', props<{winner: number}>());
export const game = createAction('[Match] Game', props<{winner: number}>());
export const set = createAction('[Match] Set', props<{winner: number}>());
export const match = createAction('[Match] Match', props<{winner: number}>());
export const tiebreak = createAction('[Match] Tiebreak');
export const doNothing = createAction('[Match] Do nothing');
export const load = createAction('[Match] Load');
export const loadSuccess = createAction('[Match] Load success', props<{match: State}>());
export const reset = createAction('[Match] Reset');
export const setMaxSets = createAction('[Match] Set max sets', props<{maxSets: number}>());

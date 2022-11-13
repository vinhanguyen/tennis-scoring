import { createAction, props } from "@ngrx/store";

export const point = createAction('[Match] Point', props<{winner: number}>());
export const game = createAction('[Match] Game', props<{winner: number}>());
export const set = createAction('[Match] Set', props<{winner: number}>());
export const match = createAction('[Match] Match', props<{winner: number}>());
export const tiebreak = createAction('[Match] Tiebreak');
export const doNothing = createAction('[Match] Do nothing');

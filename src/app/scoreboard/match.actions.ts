import { createAction, props } from "@ngrx/store";

export const point = createAction('[Match] Point', props<{winner: number}>());
export const replay = createAction('[Match] Replay point');

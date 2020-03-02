import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import {
  memberReducer,
  MemberState
} from "../members/reducers/members-reducer";

export interface State {
  miembros: MemberState;
}

export const reducers: ActionReducerMap<State> = { miembros: memberReducer };

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

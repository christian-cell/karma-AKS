import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState } from "../models/appState.models";
import { UserReducer } from "./reducers/users/user.reducers";
import { hydrationMetaReducer } from "./hydratation.redcuer";
import { UsersReducer } from "./reducers/users/users.reducers";

export const reducers : ActionReducerMap<AppState> = {

  User :                                    UserReducer,
  Users:                                    UsersReducer
}

export function debug(reducer: ActionReducer<string>): ActionReducer<string> {

  return function(state, action) {
  
    return reducer(state, action);
  };
}

export const metaReducers : MetaReducer[] = [hydrationMetaReducer]
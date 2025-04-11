// hydration reducer
import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { AppState } from "../models/appState.models";

 
export const hydrationMetaReducer = (

  reducer: ActionReducer<AppState>

): ActionReducer<AppState> => {

  return (state, action) => {

    if (action.type === INIT || action.type === UPDATE) {

      const storageValue = localStorage.getItem("state");

      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }

    const nextState = reducer(state, action);

    /* pay attention about what you keep in localStorage , deppend on browser limits of localStorage are arround 5MB */
    const stateToStore = { User : nextState.User /* , PrescriptionsFilters : nextState.PrescriptionsFilters */ };

    localStorage.setItem("state", JSON.stringify(stateToStore));
    
    return nextState;
  };
};
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { CountriesState } from './reducers/countries.reducers';
import * as fromCountries from './reducers/countries.reducers';
import * as fromTheme from './reducers/theme.reducer';
export interface AppState {
  countriesState: CountriesState;
  theme: string;
}

/**
 * REDUCERS app reducer
 */
export const reducers: ActionReducerMap<AppState> = {
  countriesState: fromCountries.countriesReducer,
  theme: fromTheme.themeReducer,
};

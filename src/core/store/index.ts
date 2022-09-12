import { CountriesState } from './reducers/countries.reducers';

export interface AppState {
  countriesState: CountriesState;
  theme: 'dark' | 'light';
}

import { createReducer, on } from '@ngrx/store';
import { Country } from 'src/app/models/country';
import { createRehydrateReducer } from '../reducer';
import {
  AddToVisited,
  ClearCountriesSearch,
  ClearVisited,
  CountriesLoadedSuccessfully,
  SearchCountries,
  SelectRegion,
  UnselectRegion,
} from './countries.actions';

export interface CountriesState {
  countries: Country[];
  visitedCountries: string[];
  selectedRegions: string[];
  query: string | null;
}

export const initialCountriesState: CountriesState = {
  countries: [],
  selectedRegions: [],
  visitedCountries: [],
  query: null,
};

export const countriesReducer = createRehydrateReducer(
  'countries',
  initialCountriesState,
  on(CountriesLoadedSuccessfully, (state, action) => {
    return { ...state, countries: action.countries };
  }),
  on(SearchCountries, (state, action) => {
    return { ...state, query: action.query };
  }),
  on(ClearCountriesSearch, (state) => ({ ...state, query: null })),
  on(AddToVisited, (state, action) => {
    return {
      ...state,
      visitedCountries: [action.country].concat(
        state.visitedCountries.filter((x) => x != action.country)
      ),
    };
  }),
  on(ClearVisited, (state) => {
    return { ...state, visitedCountries: [] };
  }),
  on(SelectRegion, (state, action) => {
    return {
      ...state,
      selectedRegions: [...state.selectedRegions, action.region],
    };
  }),
  on(UnselectRegion, (state, action) => {
    return {
      ...state,
      visitedCountries: [
        ...state.visitedCountries.filter((x) => x != action.region),
      ],
    };
  })
);

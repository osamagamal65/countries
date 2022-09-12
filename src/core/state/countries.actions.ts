import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/models/country';

/** */
export const LoadCountries = createAction('[Countries] Load Countries');

/** */
export const CountriesLoadedSuccessfully = createAction(
  '[Countries Loaded] Countries loaded',
  props<{ countries: Country[] }>()
);

/** */
export const SearchCountries = createAction(
  '[Countries search] Countries search',
  props<{ query: string }>()
);
/** */
export const ClearCountriesSearch = createAction(
  '[Countries search] Countries clear search'
);
/** */
export const SelectRegion = createAction(
  '[Countries] select region',
  props<{ region: string }>()
);

/** */
export const UnselectRegion = createAction(
  '[Countries] unselect region',
  props<{ region: string }>()
);

/** */
export const AddToVisited = createAction(
  '[Countries] add to visitedCountries',
  props<{ country: string }>()
);

/** */
export const ClearVisited = createAction('[Countries] clear Visited ');

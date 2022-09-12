import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Country } from 'src/app/models/country';
import { CountriesState } from '../reducers/countries.reducers';

export const getCountryFeatureState =
  createFeatureSelector<CountriesState>('countries');
/**
 * gets the list of regions based of the regions available in the store.
 */
export const getRegions = createSelector(
  getCountryFeatureState,
  ({ countries }) => Array.from(new Set(countries.map((e) => e.region)))
);

export const getSelectedRegions = createSelector(
  getCountryFeatureState,
  ({ selectedRegions }) => selectedRegions
);
/**
 * gets the list of countries and filter them if there's a search query,
 */
export const getCountries = createSelector(
  getCountryFeatureState,
  ({ query, countries, selectedRegions }) => {
    return filterCountries(
      query?.toLocaleLowerCase() ?? null,
      countries,
      selectedRegions
    );
  }
);

export const getVisitedCountries = createSelector(
  getCountryFeatureState,
  ({ countries, visitedCountries }) => {
    return visitedCountries
      .map((visited) => countries.find((c) => c.name.common === visited)!)
      .filter((e) => !!e);
  }
);

function filterCountries(
  query: string | null,
  countries: Country[],
  selectedRegions: string[]
): Country[] {
  if (!query || !query.length) {
    return selectedRegions.length
      ? countries.filter((country) => selectedRegions.includes(country.region))
      : countries;
  }
  return countries.filter(
    (country: Country) =>
      (!selectedRegions.length || selectedRegions.includes(country.region)) &&
      (country.name.common.toLocaleLowerCase().includes(query) ||
        country.name.official.toLocaleLowerCase().includes(query) ||
        (country.name.nativeName &&
          Object.values(country.name.nativeName).some(
            (x) =>
              x.common.toLocaleLowerCase().includes(query) ||
              x.official.toLocaleLowerCase().includes(query)
          )) ||
        country.cca2?.toLocaleLowerCase().includes(query) ||
        country.cca3?.toLocaleLowerCase().includes(query) ||
        country.fifa?.toLocaleLowerCase().includes(query) ||
        (country.capital &&
          country.capital.some((x) =>
            x.toLocaleLowerCase().startsWith(query)
          )) ||
        country.region.toLocaleLowerCase().includes(query) ||
        (country.subregion &&
          country.subregion.toLocaleLowerCase().includes(query)))
  );
}

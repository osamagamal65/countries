import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Country } from 'src/app/models/country';
import { CountriesState } from '../reducers/countries.reducers';

export const getCountryFeatureState =
  createFeatureSelector<CountriesState>('countriesState');
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
/**
 *
 * @param countrySlug the country slug or CIOC or CCA3
 * @returns returns the country
 */
export const getCountryByName = (countrySlug: string) =>
  createSelector(getCountryFeatureState, ({ countries }) => {
    return countries.find(
      (x) => x.cioc == countrySlug || x.cca3 == countrySlug
    )!;
  });

/**
 *
 */
export const getVisitedCountries = createSelector(
  getCountryFeatureState,
  ({ countries, visitedCountries }) => {
    return visitedCountries
      .map((visited) => countries.find((c) => c.name.common === visited)!)
      .filter((e) => !!e);
  }
);
/**
 *
 */
export const selectCurrentCountry = createSelector(
  getCountryFeatureState,
  ({ countries, visitedCountries }) => {
    return countries.find((x) => x.name.common == visitedCountries[0])!;
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

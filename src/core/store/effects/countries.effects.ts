import {
  CountriesLoadedSuccessfully,
  LoadCountries,
} from '../actions/countries.actions';

import { mergeMap, map } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CountryRepositoryService } from 'src/app/services/countries-repository.service';
import { Country } from 'src/app/models/country';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private countryService: CountryRepositoryService
  ) {}
  /**
   * trigger a get http call to retrieve the all of the countries
   */
  LoadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Countries] Load Countries'),
      mergeMap((action: typeof LoadCountries) =>
        this.countryService.countries.pipe(
          map((countries: Country[]) =>
            CountriesLoadedSuccessfully({ countries })
          )
        )
      )
    )
  );
}

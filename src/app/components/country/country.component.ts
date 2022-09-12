import { AddToVisited } from './../../../core/state/countries.actions';
import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from 'src/app/models/country';
import { Store } from '@ngrx/store';
import { CountriesState } from 'src/core/state/countries.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  @Input()
  country!: Country;

  apiLoaded: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<CountriesState>
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          environment.googleMapsApiKey,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {}

  /**
   * @param {number[]} latlng
   * @returns returns a static map image of the country
   */
  getMapImage(latlng: number[]): string {
    // https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=YOUR_API_KEY
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latlng[0]},${latlng[1]}&zoom=8&size=400x400&key=${environment.googleMapsApiKey}`;
  }

  /**
   * navigates to country details page.
   * @param countryName
   */
  toCountry(countryName: string) {
    this.store.dispatch(AddToVisited({ country: countryName }));
    this.router.navigateByUrl(`countries/${countryName}`);
  }
}

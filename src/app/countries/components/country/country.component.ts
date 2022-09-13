import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Store } from '@ngrx/store';
import { CountriesState } from 'src/core/store/reducers/countries.reducers';
import { Router } from '@angular/router';
import * as fromCountries from 'src/core/store/actions/countries.actions';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  @Input()
  country!: Country;

  constructor(private router: Router, private store: Store<CountriesState>) {}

  ngOnInit(): void {}

  /**
   * @param {number[]} latlng
   * @returns returns a static map image of the country
   */
  getMapImage(latlng: number[]): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latlng[0]},${latlng[1]}&zoom=8&size=400x400&key=${environment.googleMapsApiKey}`;
  }

  /**
   * navigates to country details page.
   * @param countryName
   */
  toCountry(countryName: string) {
    this.store.dispatch(fromCountries.AddToVisited({ country: countryName }));
    this.router.navigateByUrl(`countries/${countryName}`);
  }
}

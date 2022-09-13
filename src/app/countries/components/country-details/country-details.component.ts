import { HttpClient } from '@angular/common/http';
import { CountriesState } from 'src/core/store/reducers/countries.reducers';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { select, Store } from '@ngrx/store';
import { selectCurrentCountry } from 'src/core/store/selectors/countries.selector';
import { environment } from 'src/environments/environment';
import * as fromCountries from 'src/core/store/selectors/countries.selector';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  country$: Observable<Country>;
  zoom = 4;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 4,
  };
  constructor(
    private httpClient: HttpClient,
    private store: Store<CountriesState>
  ) {
    this.country$ = this.store.pipe(select(selectCurrentCountry)).pipe(
      map((country) => {
        this.center = { lat: country.latlng[0], lng: country.latlng[1] };
        return country;
      })
    );
  }

  ngOnInit(): void {}

  /**
   * @param {string[]} latlng
   * @returns returns a static map image of the country
   */
  getMapImage(latlng: string[]): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latlng[0]},${latlng[1]}&zoom=8&size=400x400&key=${environment.googleMapsApiKey}`;
  }

  getCountryByName(slug: string): Observable<Country> {
    return this.store.pipe(select(fromCountries.getCountryByName(slug)));
  }
}

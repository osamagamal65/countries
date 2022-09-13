import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { CountryComponent } from './components/country/country.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RecentComponent } from './components/recent/recent.component';
import { RegionFilterComponent } from './components/region-filter/region-filter.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    LazyLoadImageModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'countries',
      },

      {
        path: 'countries',
        component: CountriesListComponent,
      },
      {
        path: 'countries/:id',
        component: CountryDetailsComponent,
      },
    ]),
  ],
  exports: [],
  declarations: [
    CountriesListComponent,
    CountryComponent,
    LoadingComponent,
    SearchBarComponent,
    RecentComponent,
    CountryDetailsComponent,
    RegionFilterComponent,
  ],
  providers: [],
})
export class CountriesModule {}

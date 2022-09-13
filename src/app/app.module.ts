import { countriesReducer } from '../core/store/reducers/countries.reducers';
import { CountryComponent } from './countries/components/country/country.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks,
} from 'ng-lazyload-image'; // <-- import it
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CountriesListComponent } from './countries/components/countries-list/countries-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingComponent } from './countries/components/loading/loading.component';
import { SearchBarComponent } from './countries/components/search-bar/search-bar.component';
import { RecentComponent } from './countries/components/recent/recent.component';
import { CountryDetailsComponent } from './countries/components/country-details/country-details.component';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from 'src/core/store/effects/countries.effects';
import { environment } from 'src/environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';
import { RegionFilterComponent } from './countries/components/region-filter/region-filter.component';
import { reducers } from 'src/core/store/index';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([CountryEffects]),
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  bootstrap: [AppComponent],
})
export class AppModule {}

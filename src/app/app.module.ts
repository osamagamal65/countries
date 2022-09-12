import { countriesReducer } from './../core/state/countries.reducers';
import { CountryComponent } from './components/country/country.component';
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
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecentComponent } from './components/recent/recent.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from 'src/core/state/countries.effects';
import { environment } from 'src/environments/environment.prod';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    CountryComponent,
    LoadingComponent,
    SearchBarComponent,
    RecentComponent,
    CountryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleMapsModule,
    LazyLoadImageModule,
    MatIconModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      countries: countriesReducer,
    }),
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

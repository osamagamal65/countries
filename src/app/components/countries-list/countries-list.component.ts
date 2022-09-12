import {
  selectCountriesState,
  getCountries,
} from './../../../core/state/index';
import { Country } from './../../models/country';
import { Observable } from 'rxjs';
import { CountryRepositoryService } from '../../services/countries-repository.service';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LoadCountries } from 'src/core/state/countries.actions';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  countries$: Observable<readonly Country[]>;
  constructor(private store: Store<Country[]>) {
    this.store.dispatch(LoadCountries());
    this.countries$ = this.store.pipe(select(getCountries));
  }

  ngOnInit(): void {}
}

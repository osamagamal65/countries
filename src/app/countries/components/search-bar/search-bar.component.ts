import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CountriesState } from 'src/core/store/reducers/countries.reducers';
import { FormControl } from '@angular/forms';
import { AutoUnsubscribe } from 'src/app/directives/auto-unsubscripe';
import {
  ClearCountriesSearch,
  SearchCountries,
} from 'src/core/store/actions/countries.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
@AutoUnsubscribe
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl('');
  constructor(private store: Store<CountriesState>) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.store.dispatch(
        !value || !value.length
          ? ClearCountriesSearch()
          : SearchCountries({ query: value })
      );
    });
  }
}

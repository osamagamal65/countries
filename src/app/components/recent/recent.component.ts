import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CountriesState } from 'src/core/store/reducers/countries.reducers';
import { select, Store } from '@ngrx/store';
import { Country } from 'src/app/models/country';
import { getVisitedCountries } from 'src/core/store';
import { AddToVisited } from 'src/core/store/actions/countries.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss'],
})
export class RecentComponent implements OnInit {
  visitedCountries$: Observable<Country[]>;
  constructor(private router: Router, private store: Store<CountriesState>) {
    this.visitedCountries$ = this.store.pipe(select(getVisitedCountries));
  }

  ngOnInit(): void {}

  /**
   * navigates to country details page.
   * @param countryName
   */
  toCountry(countryName: string) {
    this.store.dispatch(AddToVisited({ country: countryName }));
    this.router.navigateByUrl(`countries/${countryName}`);
  }
}

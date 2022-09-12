import {
  SelectRegion,
  UnselectRegion,
} from '../../../core/store/actions/countries.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CountriesState } from 'src/core/store/reducers/countries.reducers';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/directives/auto-unsubscripe';
import {
  getRegions,
  getSelectedRegions,
} from 'src/core/store/selectors/countries.selector';

@AutoUnsubscribe
@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
})
export class RegionFilterComponent implements OnInit {
  regions$: Observable<string[]>;
  selectedRegions$: Observable<string[]>;
  constructor(private store: Store<CountriesState>) {
    this.regions$ = this.store.pipe(select(getRegions));
    this.selectedRegions$ = this.store.pipe(select(getSelectedRegions));
  }

  ngOnInit(): void {}

  toggleFilter(region: string, selected: boolean = false) {
    this.store.dispatch(
      selected ? UnselectRegion({ region }) : SelectRegion({ region })
    );
  }
}

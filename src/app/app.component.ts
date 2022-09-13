import { ToggleTheme } from './../core/store/actions/theme.actions';
import { map, Observable } from 'rxjs';
import { LoadCountries } from 'src/core/store/actions/countries.actions';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/core/store';
import { themeSelector } from 'src/core/store/selectors/theme.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme$: Observable<string | unknown>;

  constructor(private store: Store<AppState>) {
    this.theme$ = this.store.pipe(select(themeSelector)).pipe(
      map((theme) => {
        if (theme != document.documentElement.getAttribute('data-theme')) {
          document.documentElement.setAttribute('data-theme', theme as string);
        }
        return theme;
      })
    );
    this.store.dispatch(LoadCountries());
  }

  /**
   * toggles the the application theme from light to dark and reveres.
   */
  toggleTheme() {
    this.store.dispatch(ToggleTheme());
  }
}

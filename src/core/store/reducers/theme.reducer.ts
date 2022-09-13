import { ToggleTheme } from './../actions/theme.actions';
import { createRehydrateReducer } from './rehydrate.reducer';
import { on } from '@ngrx/store';
const initialTheme: string = 'light';
export const themeReducer = createRehydrateReducer(
  'theme',
  initialTheme,
  on(ToggleTheme, (state) => {
    document.documentElement.setAttribute(
      'data-theme',
      state === 'light' ? 'dark' : 'light'
    );
    return state === 'light' ? 'dark' : 'light';
  })
);

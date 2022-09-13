import { createFeatureSelector, createSelector } from '@ngrx/store';

export const _themeSelector = createFeatureSelector('theme');
export const themeSelector = createSelector(_themeSelector, (state) => state);

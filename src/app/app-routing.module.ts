import { CountriesListComponent } from './countries/components/countries-list/countries-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './countries/components/country-details/country-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

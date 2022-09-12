import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    "redirectTo": "countries"
  }, {
    path: "countries",
    component: CountriesListComponent,
  }, {
    'path': "countries/:id",
    component: CountryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

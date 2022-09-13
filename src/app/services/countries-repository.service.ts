import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryRepositoryService {
  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @returns {Observable<Country[]>} a list of all countries
   */
  get countries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.apiBaseUrl}/all`);
  }
}

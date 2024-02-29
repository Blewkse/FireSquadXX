import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environnement';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public getMap(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/maps/GenerateMap');
  }
}

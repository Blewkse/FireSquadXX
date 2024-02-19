import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private baseUrl = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  public getMap(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/api/maps/GenerateMap');
  }
}

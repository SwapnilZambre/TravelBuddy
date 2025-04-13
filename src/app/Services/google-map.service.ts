import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DistanceResult } from '../Models/googleMap';
import { Observable } from 'rxjs';
import { environment } from '../../enironments/env';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  private apiUrl = environment.apiBaseUrl; 
  private http = inject(HttpClient);

  constructor() {}

  getDistance(from: string, to: string): Observable<DistanceResult> {
    const params = { origin: `${from}, pune`, destination: `${to}, pune` };
    return this.http.get<DistanceResult>(this.apiUrl+'/Distance', { params });
  }
}

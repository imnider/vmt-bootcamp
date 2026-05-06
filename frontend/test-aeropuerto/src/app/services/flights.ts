import { inject, Injectable } from '@angular/core';
import { enviroment } from '../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { IFlight } from '../interfaces/flights';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<IFlight[]> {
    return this.http.get<IFlight[]>(`${this.apiUrl}/flights`);
  }

  create(flight: Partial<IFlight>): Observable<IFlight>{
    return this.http.post<IFlight>(`${this.apiUrl}/flights`, flight);
  }

  update(id: string, flight: Partial<IFlight>): Observable<IFlight>{
    return this.http.put<IFlight>(`${this.apiUrl}/flights/${id}`, flight);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/flights/${id}`);
  }
}

import { inject, Injectable } from '@angular/core';
import { enviroment } from '../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPassenger } from '../interfaces/passenger';

@Injectable({
  providedIn: 'root',
})
export class PassengersService {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<IPassenger[]> {
    return this.http.get<IPassenger[]>(`${this.apiUrl}/passengers`);
  }

  create(passenger: Partial<IPassenger>): Observable<IPassenger>{
    return this.http.post<IPassenger>(`${this.apiUrl}/passengers`, passenger);
  }

  update(id: string, passenger: Partial<IPassenger>): Observable<IPassenger>{
    return this.http.put<IPassenger>(`${this.apiUrl}/passengers/${id}`, passenger);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/passengers/${id}`);
  }
}

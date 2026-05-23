import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class GenericService<T> {
  protected readonly http = inject(HttpClient);

  constructor(protected apiURL: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiURL);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${id}`);
  }

  create(payload: Partial<T>): Observable<T> {
    return this.http.post<T>(this.apiURL, payload);
  }

  update(id: number, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.apiURL}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}

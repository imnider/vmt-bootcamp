import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../env/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from '../../interfaces/IAuthor';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.apiUrl}/authors`);
  }

  getByID(id: string): Observable<IAuthor> {
    return this.http.get<IAuthor>(`${this.apiUrl}/authors/${id}`)
  }

  create(payload: Partial<IAuthor>): Observable<IAuthor>{
    return this.http.post<IAuthor>(`${this.apiUrl}/authors`, payload);
  }

  update(id: string, payload: Partial<IAuthor>): Observable<IAuthor>{
    return this.http.put<IAuthor>(`${this.apiUrl}/authors/${id}`, payload);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/authors/${id}`);
  }
}

import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../env/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBook } from '../../interfaces/IBook';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private apiUrl = enviroment.apiUrl;
  private http= inject(HttpClient);

  getAllBooks(): Observable<IBook[]>{
    return this.http.get<IBook[]>(`${this.apiUrl}/books`)
  }

  getBookById(id: string): Observable<IBook> {
        return this.http.get<IBook>(`${this.apiUrl}/books/${id}`);
  }

  AddBook(payload: Partial<IBook>): Observable<IBook>{
    //le pongo payload por referencia pero puedes
    //cambiarle el nombre al objeto si gustas
    return this.http.post<IBook>(`${this.apiUrl}/books`, payload)
  }

  UpdateBook(id: string, payload: Partial<IBook>): Observable<IBook>{

    return this.http.put<IBook>(`${this.apiUrl}/books/${id}`, payload);
  }

  DeleteBook(id: string){
    this.http.delete(`${this.apiUrl}/books/${id}`);
  }
}

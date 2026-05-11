import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getById(id: string): Observable<Student>{
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }
}

import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../env/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }
  
  getById(id: string): Observable<Course>{
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }
}

import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Courses } from '../../../services/courses/courses';
import { Course } from '../../../interfaces/course.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-course-list-component',
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './course-list-component.html',
  styleUrl: './course-list-component.scss',
})
export class CourseListComponent {
  private studentService = inject(Courses);
  courses: Course[] = [];
  loading = false;
  error = '';

  ngOnInit(){
    this.cargarEstudiantes();
  }

  cargarEstudiantes(){
    this.loading = true;
    this.error = '';

    this.studentService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los cursos';
        this.loading = false;
      }
    });
  }
}

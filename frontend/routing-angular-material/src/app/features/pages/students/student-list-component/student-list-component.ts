import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Students } from '../../../services/students/students';
import { Student } from '../../../interfaces/student.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-student-list-component',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './student-list-component.html',
  styleUrl: './student-list-component.scss',
})
export class StudentListComponent {
  private studentService = inject(Students);
  students: Student[] = [];
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
        this.students = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los estudiantes';
        this.loading = false;
      }
    });
  }
}

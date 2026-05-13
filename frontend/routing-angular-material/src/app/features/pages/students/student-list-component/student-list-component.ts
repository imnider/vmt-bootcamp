import { Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Students } from '../../../services/students/students';
import { Student } from '../../../interfaces/student.interface';
import { Router } from "@angular/router";
import { StudentForm } from '../student-form/student-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentDialog } from '../student-dialog/student-dialog';

@Component({
  selector: 'app-student-list-component',
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './student-list-component.html',
  styleUrl: './student-list-component.scss',
})
export class StudentListComponent {
  private studentService = inject(Students);

  loading = signal(false);
  error = signal<string | null>(null);
  students = signal<Student[]>([]);
  
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(){
    this.cargarEstudiantes();
  }

  cargarEstudiantes(){
    this.loading.set(true)
    this.error.set(null)

    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students.set(data)
        this.loading.set(false)
      },
      error: () => {
        this.error.set('Error al cargar los estudiantes');
        this.loading.set(false)
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/students', id]);
  }

  abrirFormulario(student: Student | null = null){
    const dialogRef = this.dialog.open(StudentForm, {
      width: '480px',
      data: student
    })
  }

  abrirDialog(student: Student){
    const dialogRef = this.dialog.open(StudentDialog, {
      width: '480px',
      data: student
    })
  }
}

import { Component, inject } from '@angular/core';
import { Students } from '../../../services/students/students';
import { Student } from '../../../interfaces/student.interface';

@Component({
  selector: 'app-student-detail-component',
  imports: [],
  templateUrl: './student-detail-component.html',
  styleUrl: './student-detail-component.scss',
})
export class StudentDetailComponent {
  private studentService = inject(Students);
  error = '';

  ngOnInit(){
    //this.cargarDetalle();
  }

  cargarDetalle(id: string){
    this.studentService.getById(id).subscribe({
      next: (data) => {
        
      },
      error: () => {
        this.error = `Error al cargar el estudiante con id: ${id}`;
      }
    });
  }
}

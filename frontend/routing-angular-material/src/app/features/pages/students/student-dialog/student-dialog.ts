import { Component, inject } from '@angular/core';
import { Students } from '../../../services/students/students';
import { Student } from '../../../interfaces/student.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-student-dialog',
  imports: [MatFormFieldModule],
  templateUrl: './student-dialog.html',
  styleUrl: './student-dialog.scss',
})
export class StudentDialog {
  private studentService = inject(Students);

  student: Student | null = inject(MAT_DIALOG_DATA)

  eliminar() {
    this.studentService.delete(this.student!.id).subscribe();
  }
}

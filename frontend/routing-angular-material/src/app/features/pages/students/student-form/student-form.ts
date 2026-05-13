import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Students } from '../../../services/students/students';
import { Student } from '../../../interfaces/student.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})

export class StudentForm {

  private studentService = inject(Students);

  loading = signal(false);
  isEdit = signal<boolean | null>(null);
  error = signal<string | null>(null);
  student: Student | null = inject(MAT_DIALOG_DATA)

  constructor(
    private router: Router
  ) {}

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    courseId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  ngOnInit() {
    if(this.student){
      this.isEdit.set(true);
      this.form.patchValue(this.student)
    }
  }

  guardar() {
    if(this.form.invalid) return;

    const payload: Partial<Student> =
      this.form.getRawValue();

    const accion = this.isEdit()
      ? this.studentService.update(this.student!.id, payload)
      : this.studentService.create(payload);

    accion.subscribe({
      next: () => this.router.navigate(['/students'])
    });
  }
}
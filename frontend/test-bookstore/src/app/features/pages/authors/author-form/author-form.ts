import { Component, inject, signal } from '@angular/core';
import { AuthorsService } from '../../../services/authors-service/authors-service';
import { IAuthor } from '../../../interfaces/IAuthor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { COUNTRIES } from '../../../../shared/constants/countries';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-author-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinner,
    MatSelectModule
  ],
  templateUrl: './author-form.html',
  styleUrl: './author-form.scss',
})
export class AuthorForm {
  ngOnInit() {
    if (this.author) {
      this.isEdit.set(true);
      this.form.patchValue(this.author);
    }
  }

  countries = COUNTRIES;

  private authorService = inject(AuthorsService);

  loading = signal(false);
  isEdit = signal<boolean | null>(null);
  error = signal<string | null>(null);
  author: IAuthor | null = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef<AuthorForm>);
  snackBar = inject(MatSnackBar);

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s.,;'"-]+$/),
      ],
    }),

    country: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ],
    }),

    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(25),
        Validators.pattern(/^[0-9().\-\sx]+$/i),
      ],
    }),
  });

  guardar() {
    if (this.form.invalid) return;
    this.loading.set(true);

    const payload: Partial<IAuthor> = this.form.getRawValue();

    const accion = this.isEdit()
      ? this.authorService.update(this.author!.id, payload)
      : this.authorService.create(payload);

    accion.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit() ? 'Autor actualizado correctamente' : 'Autor creado correctamente',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          },
        );
        this.loading.set(false);
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open(
          this.isEdit() ? 'Error al actualizar el autor' : 'Error al crear el autor',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          },
        );
        this.loading.set(false);
        this.error.set('Error al agregar un autor');
      },
    });
  }

  cerrar(): void {
    this.dialogRef.close(false);
  }
}

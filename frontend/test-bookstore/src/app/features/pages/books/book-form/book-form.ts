import { Component, inject, signal } from '@angular/core';
import { BooksService } from '../../../services/books-service/books-service';
import { IBook } from '../../../interfaces/IBook';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MONTHS } from '../../../../shared/constants/months';
import { IAuthor } from '../../../interfaces/IAuthor';
import { AuthorsService } from '../../../services/authors-service/authors-service';

@Component({
  selector: 'app-book-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinner,
    MatSelectModule,
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class FormBookComponent {
  //verifica si libro tiene Ibook o null
  //si tiene libro aplica un patchValue
  //para cargar el formulario con los
  //datos del libro a editar
  ngOnInit() {
    this.cargarAutores();
    if (this.book) {
      this.isEdit.set(true);
      this.form.patchValue(this.book);
    }
  }
  
  months = MONTHS;

  // varibales de validación diferentes solo para el combo box
  authorsLoading = signal(false);
  authorsError = signal<string | null>(null);
  authors = signal<IAuthor[]>([]);
  private authorService = inject(AuthorsService);

  cargarAutores() {
    this.authorsLoading.set(true);
    this.authorsError.set(null);

    this.authorService.getAll().subscribe({
      next: (data) => {
        this.authors.set(data);
        this.authorsLoading.set(false);
      },
      error: () => {
        this.authors.set([]);
        this.authorsError.set('No se pudieron cargar los autores');
        this.authorsLoading.set(false);
      },
    });
  }

  //incorporacion del servicio de libros
  private bookService = inject(BooksService);
  //poner la senal de carga y error
  loading = signal(false);
  //verificador de si se esta editando
  //o creando un libro (!! convierte a booleano)
  isEdit = signal<boolean | null>(null);
  error = signal<string | null>(null);

  book: IBook | null = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef<FormBookComponent>);

  //integracion del snackbar para mostrar
  //mensajes de exito o error
  snackBar = inject(MatSnackBar);

  //acaba la clase base del FormBookComponent
  //y se inicia la declaracion del formulario
  //con sus validaciones respectivas para
  //name, author y publishedAt
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.pattern(/^[a-zA-ZÀ-ÿ0-9\s.,:'"()-]+$/),
      ],
    }),

    author: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    publishedAt: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  guardar() {
    if (this.form.invalid) return; //si el formulario es invalido retorna nada
    this.loading.set(true); //establece periodo de carga en true

    //crea un objeto tipo Ibook
    //con los datos del formulario
    //pero con el partial<Ibook>
    //se permite no colocar todos
    //los campos de Ibook
    const payload: Partial<IBook> = this.form.getRawValue();

    //verifica si se esta editando
    //o creando un libro y usa un
    //un metodo u otro del
    //servicio de libros y lo
    //guarda en la variable accion
    //para luego suscribirse a ella
    const accion = this.isEdit()
      ? this.bookService.UpdateBook(this.book!.id, payload)
      : this.bookService.AddBook(payload);

    //se suscribe a la accion del
    //servicio antes validada
    //generando un mensaje de
    //error y un mensaje de exito
    //dependiendo del resultado
    accion.subscribe({
      next: () => {
        //se muestra un snackbar con
        //el mensaje de exito
        //dependiendo de la var
        //isEdit() este ternario solo
        //afecta al mensaje no al
        //boton ni a la duracion eso
        //se mantiene igual para ambos
        //casos
        this.snackBar.open(
          this.isEdit() ? 'Libro actualizado correctamente' : 'Libro creado correctamente',
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
          this.isEdit() ? 'Error al actualizar el libro' : 'Error al crear el libro',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          },
        );

        this.loading.set(false);
        this.error.set('Error al agregar un libro');
      },
    });
  }

  //metodo para cerrar el dialog
  //y volver a la lista de libros
  cerrar(): void {
    this.dialogRef.close(false);
  }
}

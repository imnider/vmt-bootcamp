import { Component, inject, signal } from '@angular/core';
import { IBook } from '../../../interfaces/IBook';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BooksService } from '../../../services/books-service/books-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-form',
  imports: [MatFormField, MatInputModule, MatLabel, MatDialogModule, MatError],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
  private bookService = inject(BooksService);

  loading = signal(false);
  errorMessage = signal('');
  isEdit = signal<boolean | null>(null);
  book: IBook | null = inject(MAT_DIALOG_DATA)

  constructor(private router: Router){}

  form = new FormGroup({
    name: new FormControl('', {nonNullable: true,
      validators: [Validators.required,
        Validators.minLength(3)]
    }),
    author: new FormControl('', {nonNullable: true,
      validators: [Validators.required,
        Validators.minLength(3)]
    }),
    publisheAt: new FormControl('', {nonNullable: true,
      validators: [Validators.required]
    })
  });

  guardar() {
    if (this.form.invalid) return;

    const libro: Partial<IBook> =
      this.form.getRawValue();

    const accion = this.isEdit()
      ? this.bookService.UpdateBook(this.book!.id, libro)
      : this.bookService.AddBook(libro);

    accion.subscribe({
      next: () => this.router.navigate(['/books'])
    });
  }

  cerrar(): void {
    this.router.navigate(['/books']);
  }
}

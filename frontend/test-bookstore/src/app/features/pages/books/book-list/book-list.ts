import { Component, inject, signal } from '@angular/core';
import { IBook } from '../../../interfaces/IBook';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BooksService } from '../../../services/books-service/books-service';
import { Router } from '@angular/router';
import { BookForm } from '../book-form/book-form';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ConfirmElimination } from '../confirm-elimination/confirm-elimination';


@Component({
  selector: 'app-book-list',
  imports: [MatButtonModule, MatCardModule, MatDividerModule,
    MatProgressSpinnerModule, MatIconModule,
    FormsModule, MatDialogModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {

  books = signal<IBook[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  constructor( private bookService: BooksService, private dialogRef: MatDialog) {}

  private router = inject(Router);


  ngOnInit(): void {
    this.cargarLibros();
  }


  cargarLibros(): void {

    this.loading.set(true);

    this.bookService.getAllBooks().subscribe({

      next: (data: IBook[]) => {
        this.books.set(data);
        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('Error al cargar libros');
        this.loading.set(false);
      }

    });

  }

    goToBookDetails(Id: string): void {
    this.router.navigate(['/books', Id]);
  }

  abrirFormulario(book: IBook | null = null){
    const dialogRef = this.dialogRef.open(BookForm, {
      width: '480px',
      data: book
    })
  }

  dialog = inject(MatDialog);

  confirmarEliminacion() {
    const dialogRef = this.dialog.open(ConfirmElimination, {
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.delete) {
        this.bookService.DeleteBook('id');
        // Aquí puedes actualizar la lista de autores después de eliminar uno
        this.bookService.getAllBooks().subscribe((books) => {
          this.books.set(books);
        });
      }
    });
  }
}

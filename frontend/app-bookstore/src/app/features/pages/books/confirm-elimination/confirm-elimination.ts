import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BooksService } from '../../../services/books-service/books-service';
import { IBook } from '../../../interfaces/IBook';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-confirm-elimination',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinner
  ],
  templateUrl: './confirm-elimination.html',
  styleUrl: './confirm-elimination.scss',
})
export class ConfirmElimination {

  dialogRef = inject(MatDialogRef<ConfirmElimination>);
  bookService = inject(BooksService);

  book: IBook = inject(MAT_DIALOG_DATA);
  snackBar = inject(MatSnackBar);

  loading = signal(false);
  error = signal<string | null>(null);

  //configuracion del componente dialogo
  //en su apertura y sus metodos de 
  //cierre

  //metodo para cerrar el dialog sin eliminar
  sendCancel() {
    this.dialogRef.close(false);
  }

  //metodo para cerrar el dialog confirmando la eliminacion
  //la propiedad delete se usa en otro metodo pero puede ser
  //cambiada por otra propiedad con otro nombre
  sendConfirm() {
    this.loading.set(true);

    this.bookService.DeleteBook(this.book.id).subscribe({
      next: () => {
        this.snackBar.open('Libro eliminado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.loading.set(false);
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Error al eliminar el libro', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.loading.set(false);
        this.error.set('Error al eliminar el libro');
      },
    });
  }
}
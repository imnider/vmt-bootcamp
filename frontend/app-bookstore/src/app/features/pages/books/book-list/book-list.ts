import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBookComponent } from '../book-form/book-form';
import { ConfirmElimination } from '../confirm-elimination/confirm-elimination';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from '../../../services/books-service/books-service';
import { IBook } from '../../../interfaces/IBook';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [MatButtonModule, MatCardModule, MatDividerModule,
    MatProgressSpinnerModule, MatIconModule,
    FormsModule, MatDialogModule, CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookComponent implements OnInit {
  /**
   * se llama la interfaz Ibook para 
   * escribir su array
   */
  books = signal<IBook[]>([]);
  /**
   * se usa la libreria signal para 
   * manejar los estados de carga y error
   */
  loading = signal(false);
  erroMessage = signal('');
  
  searchQuery = '';
  searchFocused = false;

  /**
   * se usa el constructor para traer 
   * los componentes del BookService 
   * y el MatDialog 
   */
  constructor(private dialogRef: MatDialog) {}
  bookService = inject(BooksService)

  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  //se usa la libreria OnInit para 
  //cargar los libros al iniciar 
  //el componente
  ngOnInit(): void {
    this.cargarLibros();
  }

  /**
   * metodo para cargar los libros del servicio
   * manejando los estados de carga 
   * y error
   */
  cargarLibros(): void {

    this.loading.set(true);
    //metodo para obtener todos los libros del servicio
    //y generar un mensaje de exito o error
    this.bookService.getAllBooks().subscribe({

      next: (data: IBook[]) => {
        this.books.set(data);
        this.loading.set(false);
      },

      error: () => {
        this.erroMessage.set('Error al cargar los libros');
        this.loading.set(false);
        this.snackbar.open('Error al cargar los libros', ''
          , {duration: 3000});
      }

    });
  }
  /**
   * metodo para navegar a los detalles del libro
   * ingresando el id del libro a mostrar
   * en la ruta /books/:id con la libreria de 
   * rutas de angular
   */
  goToBookDetails(Id: string): void {
    this.router.navigate(['/books', Id]);
  }
  
  /**
   * metodo para abrir el formulario de libro
   * ingresando el libro a editar o null para crear uno nuevo
   */
  abrirFormulario(book: IBook | null = null){
    const dialogRef = this.dialogRef.open(FormBookComponent, {
      width: '480px',
      data: book
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarLibros();
      }
    });
    
  }
  /**
   * integracion del dialogo para eliminar 
   * el libro con confirmacion 
   */
  dialog = inject(MatDialog);
  /**
   * metodo para confirmar eliminacion del 
   * libro ingresando el id del libro a 
   * eliminar
   */
  confirmarEliminacion(book: IBook) {
    const dialogRef = this.dialog.open(ConfirmElimination, {
      data: book
    });

    /**
     * suscribe al cerrar el dialogo a la respuesta
     * del dialogo para eliminar el libro si se confirma
     */
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarLibros();
      }
    });
  }

}

import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../../../interfaces/IBook';
import { BooksService } from '../../../services/books-service/books-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    CommonModule
  ],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {

  loading = signal(false);
  error = signal<string | null>(null);
  book = signal<IBook | null>(null);

  //ingreso al servicio de libros y a la 
  //libreria de rutas a traves de inject
  bookService = inject(BooksService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  //activa el metodo para cargar el libro al 
  //iniciar el componente OnInit
  ngOnInit() {
    this.obtenerLibro();
  }

  obtenerLibro() {
    this.loading.set(true);

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Error al cargar el libro', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.error.set(`Error al obtener el libro con id: ${id}`);
        this.loading.set(false);
      },
    });
  }

  //retorno a punto anterior en la navegacion
  volver() {
    this.router.navigate(['/books']);
  }
}
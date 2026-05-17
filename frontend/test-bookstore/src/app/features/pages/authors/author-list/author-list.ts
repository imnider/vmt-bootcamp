import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthorsService } from '../../../services/authors-service/authors-service';
import { IAuthor } from '../../../interfaces/IAuthor';
import { AuthorForm } from '../author-form/author-form';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmElimination } from '../confirm-elimination/confirm-elimination';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-author-list',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinner,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './author-list.html',
  styleUrl: './author-list.scss',
})
export class Authors implements OnInit {
  private readonly authorService = inject(AuthorsService);

  loading = signal(false);
  error = signal<string | null>(null);
  authorList = signal<IAuthor[]>([]);
  searchQuery = '';
  searchFocused = false;

  dialog = inject(MatDialog);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.cargarAutores();
  }

  cargarAutores() {
    this.loading.set(true);

    this.authorService.getAll().subscribe({
      next: (data) => {
        this.authorList.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Error cargando autores', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.error.set('No se pudieron cargar los autores.');
        this.loading.set(false);
      },
    });
  }

  abrirFormulario(author: IAuthor | null = null) {
    const dialogRef = this.dialog.open(AuthorForm, {
      width: '480px',
      maxWidth: '480px',
      data: author,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAutores();
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/authors', id]);
  }

  confirmDelete(author: IAuthor) {
    const dialogRef = this.dialog.open(ConfirmElimination, {
      data: author,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAutores();
      }
    });
  }
}

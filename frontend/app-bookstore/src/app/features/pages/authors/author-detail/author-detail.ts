import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthor } from '../../../interfaces/IAuthor';
import { AuthorsService } from '../../../services/authors-service/authors-service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-detail',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinner, CommonModule],
  templateUrl: './author-detail.html',
  styleUrl: './author-detail.scss',
})
export class AuthorDetail {
  loading = signal(false);
  error = signal<string | null>(null);
  author = signal<IAuthor | null>(null);

  authorService = inject(AuthorsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.obtenerAutor();
  }

  obtenerAutor() {
    this.loading.set(true);

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.authorService.getByID(id).subscribe({
      next: (data) => {
        this.author.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Error al cargar el autor', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.error.set(`Error al obtener el usuario con id: ${id}`);
        this.loading.set(false);
      },
    });
  }

  volver() {
    this.router.navigate(['/authors']);
  }
}

import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorsService } from '../../../services/authors-service/authors-service';
import { IAuthor } from '../../../interfaces/IAuthor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-confirm-elimination',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressSpinner],
  templateUrl: './confirm-elimination.html',
  styleUrl: './confirm-elimination.scss',
})
export class ConfirmElimination {
  dialogRef = inject(MatDialogRef<ConfirmElimination>);
  authorService = inject(AuthorsService);

  author: IAuthor = inject(MAT_DIALOG_DATA);
  snackBar = inject(MatSnackBar);

  loading = signal(false);
  error = signal<string | null>(null);

  sendCancel() {
    this.dialogRef.close(false);
  }

  sendConfirm() {
    this.loading.set(true);
    this.authorService.delete(this.author.id).subscribe({
      next: () => {
        this.snackBar.open('Autor eliminado correctamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.loading.set(false);
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Error al eliminar el autor', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.loading.set(false);
        this.error.set('Error al eliminar el autor');
      },
    });
  }
}

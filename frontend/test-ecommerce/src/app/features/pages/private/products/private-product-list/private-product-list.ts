import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { handleRequest } from '../../../../../shared/helpers/handleRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../../interfaces/public/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ProductForm } from '../product-form/product-form';
import { ProductConfirm } from '../product-confirm/product-confirm';

@Component({
  selector: 'app-private-product-list',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './private-product-list.html',
  styleUrl: './private-product-list.scss',
})
export class PrivateProductList {
  productService = inject(ProductService);

  loading = signal(false);
  error = signal<string | null>(null);
  products = signal<Product[]>([]);

  snackBar = inject(MatSnackBar);

  private dialog = inject(MatDialog);

  search = '';

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    handleRequest(
      this.productService.getAll(),
      this.loading,
      this.error,
      this.snackBar,
      (data: any) => {
        this.products.set(data.products);
      },
      'Ocurrió un error al cargar los productos.',
    );
  }

  openCreate() {
    const ref = this.dialog.open(ProductForm, {
      width: '900px',

      maxWidth: '95vw',

      disableClose: true,

      data: null,
    });

    ref.afterClosed().subscribe((payload) => {
      if (!payload) return;

      this.productService.create(payload).subscribe({
        next: (created) => {
          this.products.update((list) => [created, ...list]);

          this.snackBar.open('Producto creado correctamente.', 'Cerrar', {
            duration: 3000,
          });
        },

        error: () => {
          this.snackBar.open('Error al crear el producto.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }

  openEdit(product: Product) {
    const ref = this.dialog.open(ProductForm, {
      width: '900px',

      maxWidth: '95vw',

      disableClose: true,

      data: product,
    });

    ref.afterClosed().subscribe((payload) => {
      if (!payload) return;

      this.productService.update(product.id, payload).subscribe({
        next: (updated) => {
          this.products.update((list) =>
            list.map((p) =>
              p.id === product.id
                ? {
                    ...updated,
                    id: product.id,
                  }
                : p,
            ),
          );

          this.snackBar.open('Producto actualizado.', 'Cerrar', {
            duration: 3000,
          });
        },

        error: () => {
          this.snackBar.open('Error al actualizar el producto.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }

  openDelete(product: Product) {
    const dialogRef = this.dialog.open(ProductConfirm, {
      width: '420px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.productService.delete(product.id).subscribe({
        next: () => {
          this.products.update((products) => products.filter((p) => p.id !== product.id));

          this.snackBar.open('Producto eliminado correctamente.', 'Cerrar', {
            duration: 3000,
          });
        },

        error: () => {
          this.snackBar.open('Error al eliminar el producto.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }
}

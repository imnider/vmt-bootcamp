import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/public/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { handleRequest } from '../../../../shared/helpers/handleRequest';

@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, MatIconModule, MatProgressSpinner],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  productService = inject(ProductService);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  snackBar = inject(MatSnackBar);

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
}

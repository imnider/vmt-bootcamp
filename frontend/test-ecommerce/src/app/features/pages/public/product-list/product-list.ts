import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/public/product.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-list',
  imports: [MatCardModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {

  productService = inject(ProductService);
  products = signal<Product[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(){
    this.loading.set(true)
    this.productService.getAll().subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        this.loading.set(false);
      }
    })
  }
}

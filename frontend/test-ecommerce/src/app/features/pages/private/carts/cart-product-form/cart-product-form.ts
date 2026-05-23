import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../interfaces/public/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-cart-product-form',
  imports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './cart-product-form.html',
  styleUrl: './cart-product-form.scss',
})
export class CartProductForm {
  private fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<CartProductForm>);

  data = inject(MAT_DIALOG_DATA);

  products = signal<Product[]>([]);

  productService = inject(ProductService);

  form = this.fb.group({
    productId: [null, Validators.required],

    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (data: any) => {
        this.products.set(data.products);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const productId = this.form.value.productId;

    if (productId == null) return;

    const selectedProduct = this.products().find((p) => p.id === productId);

    if (!selectedProduct) return;

    this.dialogRef.close({
      product: selectedProduct,
      quantity: this.form.value.quantity,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Product } from '../../../../interfaces/public/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BRANDS } from '../../../../../shared/constants/brands.constants';
import { CATEGORIES } from '../../../../../shared/constants/categories.constants';

@Component({
  selector: 'app-product-form',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<ProductForm>);

  data: Product | null = inject(MAT_DIALOG_DATA);

  isEdit = false;

  categories = CATEGORIES;

  brands = BRANDS;

  form = this.fb.group({
    title: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(80)],
      nonNullable: true,
    }),

    sku: this.fb.control<string>('', {
      validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')],
      nonNullable: true,
    }),

    brand: this.fb.control<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    category: this.fb.control<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),

    price: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),

    discountPercentage: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0), Validators.max(100)],
    }),

    stock: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),

    description: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      nonNullable: true,
    }),
  });

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;

      this.form.patchValue({
        title: this.data.title ?? '',
        sku: this.data.sku ?? '',
        brand: this.data.brand ?? '',
        category: this.data.category ?? '',
        price: this.data.price ?? null,
        discountPercentage: this.data.discountPercentage ?? null,
        stock: this.data.stock ?? null,
        description: this.data.description ?? '',
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    // Imagen aleatoria
    const thumbnails = [
      'https://picsum.photos/500?random=1',
      'https://picsum.photos/500?random=2',
      'https://picsum.photos/500?random=3',
      'https://picsum.photos/500?random=4',
      'https://picsum.photos/500?random=5',
    ];

    const randomThumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];

    this.dialogRef.close({
      ...this.form.value,
      thumbnail: randomThumbnail,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}

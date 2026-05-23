import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart-form',
  imports: [MatIconModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './cart-form.html',
  styleUrl: './cart-form.scss',
})
export class CartForm {
  private fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<CartForm>);

  form = this.fb.group({
    userId: [null, [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

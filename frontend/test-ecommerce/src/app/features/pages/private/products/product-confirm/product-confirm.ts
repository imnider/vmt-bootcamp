import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-confirm',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './product-confirm.html',
  styleUrl: './product-confirm.scss',
})
export class ProductConfirm {
  dialogRef = inject(MatDialogRef<ProductConfirm>);

  data = inject(MAT_DIALOG_DATA);

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}

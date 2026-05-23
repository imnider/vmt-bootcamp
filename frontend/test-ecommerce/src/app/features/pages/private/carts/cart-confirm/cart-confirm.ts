import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-confirm',
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './cart-confirm.html',
  styleUrl: './cart-confirm.scss',
})
export class CartConfirm {
  dialogRef = inject(MatDialogRef<CartConfirm>);
  data = inject(MAT_DIALOG_DATA);

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

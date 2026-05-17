import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-elimination',
  imports: [],
  templateUrl: './confirm-elimination.html',
  styleUrl: './confirm-elimination.scss',
})
export class ConfirmElimination {

  dialogRef = inject(MatDialogRef<ConfirmElimination>);
  sendCancel() {
    this.dialogRef.close({ delete: true });
  }

  sendConfirm() {
    this.dialogRef.close({ delete: false });
  }
}

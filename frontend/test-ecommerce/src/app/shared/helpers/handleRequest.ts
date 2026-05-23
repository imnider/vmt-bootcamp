import { WritableSignal } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

export function handleRequest<T>(
  request: Observable<T>,
  loading: WritableSignal<boolean>,
  error: WritableSignal<string | null>,
  snackBar: MatSnackBar,
  onSuccess: (data: T) => void,
  errorMessage = 'Ocurrió un error',
) {
  loading.set(true);

  request.subscribe({
    next: (data) => {
      onSuccess(data);
      loading.set(false);
    },
    error: () => {
      error.set(errorMessage);
      loading.set(false);
      snackBar.open(errorMessage, 'Cerrar');
    },
  });
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-component',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  
  form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
  });

  onSubmit() {
      if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
      }

      const { username, password } = this.form.value;

      this.auth.login({ username: username!, password: password! }).subscribe({
          next: () => {
              this.router.navigate(['/admin/dashboard']);
          }
      });
  }
}

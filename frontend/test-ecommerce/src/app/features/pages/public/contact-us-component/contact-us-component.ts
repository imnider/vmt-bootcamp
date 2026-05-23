import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-us-component',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contact-us-component.html',
  styleUrl: './contact-us-component.scss',
})
export class ContactUsComponent {}

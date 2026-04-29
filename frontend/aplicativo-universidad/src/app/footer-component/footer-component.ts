import { formatDate } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
})
export class FooterComponent {
  actualYear = new Date().getFullYear();
  copyrightStatus:boolean = false;
  copyrightMessage:string = `©${this.actualYear}. Todos los derechos reservados`;

  generateCopyright(): void {
    this.copyrightStatus = true;
  }
}

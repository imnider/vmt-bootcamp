import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-footer',
  imports: [MatIconModule],
  templateUrl: './public-footer.html',
  styleUrl: './public-footer.scss',
})
export class PublicFooter {
  currentYear = new Date().getFullYear();
}

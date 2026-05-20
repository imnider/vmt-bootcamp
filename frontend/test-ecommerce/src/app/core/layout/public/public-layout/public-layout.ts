import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicHeader } from '../components/public-header/public-header';
import { PublicNavbar } from '../components/public-navbar/public-navbar';
import { PublicFooter } from '../components/public-footer/public-footer';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterOutlet,
    PublicHeader,
    PublicNavbar,
    PublicFooter,
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayoutComponent {}
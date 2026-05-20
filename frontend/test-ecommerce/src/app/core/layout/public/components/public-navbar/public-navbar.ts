import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './public-navbar.html',
  styleUrl: './public-navbar.scss',
})
export class PublicNavbar {}

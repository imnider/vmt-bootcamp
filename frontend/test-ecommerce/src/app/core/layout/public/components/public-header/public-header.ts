import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-public-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './public-header.html',
  styleUrl: './public-header.scss',
})
export class PublicHeader {}

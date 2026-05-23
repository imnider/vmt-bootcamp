import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../../features/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  imports: [MatIconModule, RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout(this.router);
  }
}

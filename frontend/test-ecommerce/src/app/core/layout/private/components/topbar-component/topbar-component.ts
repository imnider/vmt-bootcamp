import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../features/services/auth.service';

@Component({
  selector: 'app-topbar-component',
  imports: [],
  templateUrl: './topbar-component.html',
  styleUrl: './topbar-component.scss',
})
export class TopbarComponent {
  auth = inject(AuthService);
}

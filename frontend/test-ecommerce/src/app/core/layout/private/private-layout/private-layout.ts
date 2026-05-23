import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar-component/sidebar-component';
import { TopbarComponent } from '../components/topbar-component/topbar-component';

@Component({
  selector: 'app-private-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.scss',
})
export class PrivateLayout {}

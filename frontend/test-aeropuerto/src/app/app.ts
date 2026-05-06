import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightComponent } from './components/flight-component/flight-component';
import { PassengerComponent } from './components/passenger-component/passenger-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FlightComponent, PassengerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('test-aeropuerto');
}

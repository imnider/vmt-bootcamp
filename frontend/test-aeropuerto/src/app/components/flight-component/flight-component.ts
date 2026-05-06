import { Component, inject } from '@angular/core';
import { FlightsService } from '../../services/flights';
import { IFlight } from '../../interfaces/flights';

@Component({
  selector: 'app-flight-component',
  imports: [],
  templateUrl: './flight-component.html',
  styleUrl: './flight-component.scss',
})
export class FlightComponent {
  private flightService = inject(FlightsService);
  flights: IFlight[] = [];
  loading = false;
  error = '';

  ngOnInit(){
    this.cargarVuelos();
  }

  cargarVuelos() {
    this.loading = true;
    this.error = '';

    this.flightService.getAll().subscribe({
      next: (data) => {
        this.flights = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los vuelos';
        this.loading = false;
      }
    });
  }

  agregarVuelo(){
    const payload: Partial<IFlight> = {
      origin: 'nv-origen-vuelo-1',
      destination: 'nv-destino-vuelo-1',
      price: '900.0',
      departure: '2026-12-20T21:41:14.397Z',
      flightNumer: '111111'
    };

    this.flightService.create(payload).subscribe({
      next: (data) => {
        this.flights = [...this.flights, data];
      },
      error: () => {
        this.error = "Error al crear el vuelo";
      }
    });
  }

  editarVuelo(id: string){
    const payload: Partial<IFlight> = {
      origin: 'nv-origen-vuelo-1-editado',
      destination: 'nv-destino-vuelo-1-editado',
      price: '900.0',
      departure: '2026-12-20T21:41:14.397Z',
      flightNumer: '111111'
    };

    this.flightService.update(id, payload).subscribe({
      next: (data) => {
        this.flights = this.flights.map(v => v.id === id ? data : v);
      },
      error: () => {
        this.error = 'Error al editar el vuelo';
      }
    });
  }

  eliminarVuelo(id: string){
    this.flightService.delete(id).subscribe({
      next: () => {
        this.flights = this.flights.filter(v => v.id !== id);
      },
      error: () => {
        this.error = 'Error al eliminar el vuelo';
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { PassengersService } from '../../services/passengers';
import { IPassenger } from '../../interfaces/passenger';

@Component({
  selector: 'app-passenger-component',
  imports: [],
  templateUrl: './passenger-component.html',
  styleUrl: './passenger-component.scss',
})
export class PassengerComponent {
  private passengerService = inject(PassengersService);
  passengers: IPassenger[] = [];
  loading = false;
  error = '';

  ngOnInit(){
    this.cargarPasajeros();
  }

  cargarPasajeros(){
    this.loading = true;
    this.error = '';

    this.passengerService.getAll().subscribe({
      next: (data) => {
        this.passengers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los pasajeros';
        this.loading = false;
      }
    });
  }

  agregarPasajero(){
    const payload: Partial<IPassenger> = {
      name: 'nv-pasajero1',
      email: 'test@mail.com',
      nationality: 'Ecuador'
    }

    this.passengerService.create(payload).subscribe({
      next: (data) => {
        this.passengers = [...this.passengers, data];
      },
      error: () =>{
        this.error = 'Error al crear el pasajero';
      }
    });
  }

  editarPasajero(id: string){
    const payload: Partial<IPassenger> = {
      name: 'nv-pasajero1-editado',
      email: 'test@mail.com',
      nationality: 'Ecuador'
    }

    this.passengerService.update(id, payload).subscribe({
      next: (data) => {
        this.passengers = this.passengers.map(p => p.id === id ? data : p);
      },
      error: () => {
        this.error = 'Error al editar el pasajero';
      }
    });
  }

  eliminarPasajero(id: string){
    this.passengerService.delete(id).subscribe({
      next: () => {
        this.passengers = this.passengers.filter(p => p.id !== id);
      },
      error: () => {
        this.error = 'Error al eliminar el pasajero';
      }
    });
  }
}

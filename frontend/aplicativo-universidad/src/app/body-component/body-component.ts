import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-body-component',
  imports: [FormsModule],
  templateUrl: './body-component.html',
  styleUrl: './body-component.scss',
})
export class BodyComponent {
  busqueda:string = "";
  creditos: number = 45;
  creditosPorcentaje: number = (this.creditos/100)*120;

  materias:Materia[] = [
    {nombre: "Calculo", creditos: 4, aprobada: true},
    {nombre: "Física", creditos: 4, aprobada: false},
    {nombre: "Programacion", creditos: 3, aprobada: true},
    {nombre: "Base de Datos", creditos: 3, aprobada: false},
    {nombre: "Ingles", creditos: 2, aprobada: true}
  ];

  agregarProgreso(): void {
    if(this.creditos<120){
      this.creditos +=10;
    }
    if(this.creditos>120){
      this.creditos=120;
    }
    this.creditosPorcentaje = (this.creditos/100)*120;
  }

  quitarProgreso(): void {
    if(this.creditos>0){
      this.creditos -=10;
    }
    if(this.creditos<0){
      this.creditos=0;
    }
    this.creditosPorcentaje = (this.creditos/100)*120;
  }

}

interface Materia {
    nombre: string;
    creditos: number;
    aprobada: boolean;
}

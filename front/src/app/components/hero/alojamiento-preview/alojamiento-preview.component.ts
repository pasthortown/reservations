import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alojamiento-preview',
  standalone: true,
  imports: [],
  templateUrl: './alojamiento-preview.component.html',
  styleUrl: './alojamiento-preview.component.css'
})
export class AlojamientoPreviewComponent {
  @Input('alojamiento')  alojamiento: any = {
    nombre: '',
    personas: 0,
    metros: 0,
    habitaciones: 0,
    banos: 0,
    zona: '',
    desde_noche: 0,
    desde_mes: 0,
    descripcion: '',
    ubication: {
        lat: 0,
        lng: 0
    },
    check_in: '',
    check_out: '',
    galery: [],
    condiciones: [],
    servicios: [],
    images: [],
    rate: 0,
    comentarios: [],
    hide: false,
  };
}

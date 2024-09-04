import { Component, Input, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { HttpClientModule } from '@angular/common/http';

import {
  ButtonCloseDirective,
  ButtonDirective,
  ColComponent,
  RowComponent
} from '@coreui/angular';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [ ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, HttpClientModule],
  providers: [CatalogService],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})

export class ReservasComponent {
  @Input('alojamientos') alojamientos: any[] = [];

  reservas: any[] = [];

  constructor(private catalogService: CatalogService) {}

  get_reservations() {
    let reserva_output_model: any = {
      alojamiento_id: true,
      total: true,
      huespedes: true,
      fecha_in: true,
      fecha_out: true,
      noches: true
    };

    this.reservas = [];

    this.catalogService.get_items('reservas', reserva_output_model).then(r_reserva => {
      console.log(r_reserva.response)
      if (r_reserva.status == 200) {
        this.reservas = r_reserva.response;
        this.get_alojamientos();
      }
    }).catch(e => console.log(e));
  }

  get_alojamientos() {
    this.reservas.forEach((reserva: any) => {
      this.alojamientos.forEach((alojamiento: any) => {
        if (reserva.alojamiento_id == alojamiento.item_id) {
          reserva.alojamiento = alojamiento;
        }
      });
    });
  }

  ngOnInit() {
    this.get_reservations();
  }  

}

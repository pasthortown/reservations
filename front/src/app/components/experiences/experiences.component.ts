import { Component, Input, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [],
  providers: [CatalogService],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit{
  user: any = null;
  reservas: any[] = [];

  ngOnInit(): void {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
    } catch (error) {
      this.user = null;
    }
    if (this.user) {
      if( this.user.fullname) {
        this.get_reservations(true);
      }
    } else {
      this.get_reservations(false);
    }
  }

  constructor(private catalogService: CatalogService) {}

  get_reservations(all: boolean) {
    let reserva_output_model: any = {
      client_id: true,
      alojamiento_id: true,
      total: true,
      huespedes: true,
      fecha_in: true,
      fecha_out: true,
      noches: true
    }
    this.reservas = [];
    if (all) {
      this.catalogService.get_items('reservas',reserva_output_model).then(r_reserva => {
        if(r_reserva.status == 200) {
          this.reservas = r_reserva.response;
        }
      }).catch( e => console.log(e) );
    } else {
      this.catalogService.search_items('reservas', 'client_id', this.user.item_id, reserva_output_model).then(r_reserva => {
        if(r_reserva.status == 200) {
          this.reservas = r_reserva.response;
        }
      }).catch( e => console.log(e) );
    }
  }
}

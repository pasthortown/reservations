import { Component, Input } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { CommonModule } from '@angular/common';

import {
  ButtonCloseDirective,
  ButtonDirective,
  ColComponent,
  RowComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  TextColorDirective,
  ThemeDirective,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
  PaginationComponent,
  PageItemComponent,
  PageLinkDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonGroupComponent,
  ButtonToolbarComponent,
  FormFloatingDirective,
  FormDirective,
  FormSelectDirective,
  FormLabelDirective
} from '@coreui/angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TextColorDirective, ThemeDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonGroupComponent, ButtonToolbarComponent, FormFloatingDirective, FormDirective, FormSelectDirective, FormLabelDirective ],
  providers: [CatalogService],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent {
  @Input('is_visible') is_visible: boolean = false;
  @Input('alojamientos') alojamientos: any[] = [];

  user: any = null;
  reservas: any[] = [];

  ngOnChanges(): void {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
    } catch (error) {
      this.user = null;
    }
    if (this.user) {
      if( this.user.fullname) {
        this.get_reservations(false);
      }
    } else {
      this.get_reservations(true);
    }
  }

  constructor(private catalogService: CatalogService) {}

  add_comment() {

  }

  delete_reserva() {

  }

  get_reservations(all: boolean) {
    let reserva_output_model: any = {
      client_id: true,
      alojamiento_id: true,
      total: true,
      huespedes: true,
      fecha_in: true,
      fecha_out: true,
      noches: true
    };
    this.reservas = [];
    if (all) {
      this.catalogService.get_items('reservas',reserva_output_model).then(r_reserva => {
        if(r_reserva.status == 200) {
          this.reservas = r_reserva.response;
          this.get_alojamientos();
        }
      }).catch( e => console.log(e) );
    } else {
      this.catalogService.search_items('reservas', 'client_id', this.user.item_id, reserva_output_model).then(r_reserva => {
        if(r_reserva.status == 200) {
          this.reservas = r_reserva.response;
          this.get_alojamientos();
        }
      }).catch( e => console.log(e) );
    }
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
}

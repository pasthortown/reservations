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

  fecha_actual: number = new Date().getTime();
  reserva_selected: any = null;
  user: any = null;
  reservas: any[] = [];

  ngOnChanges(): void {
    this.refresh();
  }

  refresh() {
    this.reserva_selected = null;
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
    let alojamiento_selected: any = null;
    this.alojamientos.forEach((element: any) => {
        if (element.item_id == this.reserva_selected.alojamiento_id) {
          alojamiento_selected = element;
        }
    });
    Swal.fire({
      title: 'Estamos felices de recibir tus comentarios',
      text: 'En una escala del 1 al 5 califica tu experiencia (1 insatisfactorio, 5 totalmente satisfgecho)',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
      input: "number",
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingresa un número';
        } else if (!/^[1-5]$/.test(value)) {
          return 'Solo se permiten números enteros entre 1 y 5';
        }
        return null;
      }
    }).then(result_number => {
      if (result_number.isConfirmed) {
        Swal.fire({
          title: 'Estamos felices de recibir tus comentarios',
          text: 'Cuéntanos como fue tu experiencia en este lugar',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
          input: "text",
        }).then(result_text => {
          if (result_text.isConfirmed) {
            let rate = result_number.value;
            let comentario = result_text.value;
            if (!alojamiento_selected.comentarios) {
              alojamiento_selected.comentarios = [];
            }
            alojamiento_selected.comentarios.push({rate: rate, texto: comentario, client_id: this.user.item_id, remitente: this.user.fullname, timestamp: new Date()});
            let total = 0;
            let cuenta = 0;
            alojamiento_selected.comentarios.forEach((element: any) => {
              total = total + Number(element.rate);
              cuenta = cuenta + 1;
            });
            alojamiento_selected.rate = Math.round(total / cuenta);
            this.catalogService.update_item('alojamientos',alojamiento_selected.item_id, alojamiento_selected).then().catch( e => console.log(e) );
            Swal.fire({
              title: 'Gracias',
              text: 'Agradecemos mucho tus comentarios',
              icon: 'info',
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar"
            });
          }
        });
      }
    });

  }

  delete_reserva() {
    Swal.fire({
      title: 'Confirmación de anulación de reserva',
      text: 'Estas seguro de anular tu reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar"
    }).then(result => {
      if (result.value) {
        this.catalogService.delete_item('reservas', this.reserva_selected.item_id).then( r => {
          this.refresh();
        }).catch( e => console.log(e) );
      }
    });
  }

  get_reservations(all: boolean) {
    let reserva_output_model: any = {
      client_id: true,
      alojamiento_id: true,
      pago: true,
      total: true,
      huespedes: true,
      fecha_in: true,
      fecha_out: true,
      noches: true,
      user: {
        fullname: this.user.fullname,
        identification: this.user.identification,
        phone_number: this.user.phone_number,
        email: this.user.email
      }
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
      reserva.timein = new Date(reserva.fecha_in).getTime();
      reserva.timeout = new Date(reserva.fecha_out).getTime();
      this.alojamientos.forEach((alojamiento: any) => {
        if (reserva.alojamiento_id == alojamiento.item_id) {
          reserva.alojamiento = alojamiento;
        }
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { HttpClientModule } from '@angular/common/http';

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
import { FilesService } from 'src/app/services/file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, ModalToggleDirective, TextColorDirective, ThemeDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonGroupComponent, ButtonToolbarComponent, FormFloatingDirective, FormDirective, FormSelectDirective, FormLabelDirective ],
  providers: [CatalogService, FilesService],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})

export class ReservasComponent implements OnInit{
  reserva_selected: any = null;
  reservas: any[] = [];
  fecha_actual: number = new Date().getTime();

  constructor(private catalogService: CatalogService, private fileService: FilesService) {}

  get_reservations() {
    let reserva_output_model: any = {
      client_id: true,
      alojamiento_id: true,
      pago: true,
      total: true,
      huespedes: true,
      fecha_in: true,
      fecha_out: true,
      noches: true
    };
    this.reservas = [];
    this.catalogService.get_items('reservas', reserva_output_model).then(r_reserva => {
      if (r_reserva.status == 200) {
        this.reservas = r_reserva.response;
        this.get_alojamientos();
      }
    }).catch(e => console.log(e));
  }

  change_payed_state(new_state: boolean) {
    this.reserva_selected.pago = new_state;
    this.catalogService.update_item('reservas', this.reserva_selected.item_id, this.reserva_selected).then( r => {
      this.refresh();
    }).catch( e => console.log(e) );
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

  get_alojamientos() {
    let alojamiento_output_model = {
      nombre: true,
      personas: true,
      metros: true,
      habitaciones: true,
      banos: true,
      zona: true,
      desde_noche: true,
      desde_mes: true,
      descripcion: true,
      ubication: true,
      check_in: true,
      check_out: true,
      propietario: true,
      galery: true,
      condiciones: true,
      servicios: true,
      rate: true,
      comentarios: true,
      hide: true,
    }
    this.reservas.forEach((reserva: any) => {
      this.catalogService.get_item('alojamientos', reserva.alojamiento_id, alojamiento_output_model).then((r_alojamiento: any) => {
        reserva.alojamiento = r_alojamiento.response;
        reserva.alojamiento.images = [];
        if (reserva.alojamiento.galery) {
          if(reserva.alojamiento.galery.length > 0) {
            reserva.alojamiento.galery.forEach((element: any) => {
              this.fileService.get_file('fotografias_alojamientos', element).then(r => {
                reserva.alojamiento.images.push(r.response);
                if (r.response.favorite) {
                  reserva.alojamiento.portada = r.response;
                }
              }).catch( e => console.log(e) );
            });
          }
        }
      }).catch( e => console.log(e) );
    });
  }

  refresh() {
    this.reservas = [];
    this.get_reservations();
  }

  ngOnInit() {
    this.refresh();
  }

}

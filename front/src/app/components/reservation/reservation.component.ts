import Swal from 'sweetalert2';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StarsComponent } from "../stars/stars.component";
import { ThemeDirective, CardFooterComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, ButtonCloseDirective, ButtonGroupComponent, ButtonToolbarComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ScheduleComponent, CommonModule, StarsComponent,  ButtonCloseDirective, ButtonDirective,  FormsModule, ButtonGroupComponent, ButtonToolbarComponent, ThemeDirective, CardFooterComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  @Input('type_of_reservation')  type_of_reservation: string = '';
  @Output('cancel_modal') cancel_modal: EventEmitter<any> = new EventEmitter();
  @Output('login_modal') login_modal: EventEmitter<any> = new EventEmitter();
  @Output('reservation') reservation: EventEmitter<any> = new EventEmitter();

  noches: number = 0;
  meses: number = 0;
  huespedes: number = 0;
  fecha_check_in: Date | null = null;
  fecha_check_out: Date | null = null;
  total: number = 0;
  disponible: boolean = false;

  @Input('alojamiento')  alojamiento: any = {
    nombre: '',
    personas: 0,
    metros: 0,
    habitaciones: 0,
    reservas: [],
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
    propietario: '',
  };
  user: any = null;

  @Input('reservas')  reservas: any[] = [];

  agenda: any[] = [];

  constructor() {
    const today = new Date();
    this.fecha_check_in = null;
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    this.fecha_check_out = null;
  }

  calendar_selected_date(event: any) {
    let selectedDate: Date = event.date
    if (!this.fecha_check_in || (this.fecha_check_in && this.fecha_check_out)) {
      this.fecha_check_in = selectedDate;
      this.fecha_check_out = null;
    } else if (!this.fecha_check_out && selectedDate >= this.fecha_check_in) {
      this.fecha_check_out = selectedDate;
      this.populateAgenda();
      if (!this.disponible) {
        Swal.fire({
          title: 'Fecha no disponible',
          text: 'No es posible reservar en esa fecha',
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar"
        });
      }
    } else {
      this.fecha_check_in = selectedDate;
      this.fecha_check_out = null;
    }
  }

  populateAgenda() {
    this.agenda = [];
    this.disponible = true;
    this.draw_reservas();
    if (this.fecha_check_in && this.fecha_check_out && this.disponible) {
      this.set_range_events(this.fecha_check_in, this.fecha_check_out, 'rgba(0, 255, 0, 0.4)', 'Reservado');
      this.calcular_noches();
    }
  }

  draw_reservas() {
    this.agenda = [];
    this.reservas.forEach((reserva: any) => {
      const date_in = new Date(reserva.fecha_in);
      const date_out = new Date(reserva.fecha_out);
      this.set_range_events(date_in, date_out, 'rgba(255, 0, 0, 0.4)', 'Ocupado');
      if (this.fecha_check_in && this.fecha_check_out) {
        let c1: boolean = this.fecha_check_in >= date_in && this.fecha_check_in <= date_out;
        let c2: boolean = this.fecha_check_out >= date_in && this.fecha_check_out <= date_out;
        let c3: boolean = this.fecha_check_in <= date_in && this.fecha_check_out >= date_out;
        if (c1 || c2 || c3) {
          this.disponible = false;
        }
      }
    });
  }

  set_range_events(fecha_inicio: Date, fecha_fin: Date, color: string, message: string) {
    const current = new Date(fecha_inicio);
    while (current <= fecha_fin) {
      this.agenda.push({
        date: new Date(current),
        title: message,
        startTime: '00:01',
        endTime: '23:59',
        color: color
      });
      current.setDate(current.getDate() + 1);
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses comienzan desde 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cancelar() {
    this.cancel_modal.emit(true);
  }

  ngOnChanges() {
    this.updateUser();
    this.draw_reservas();
  }

  updateUser() {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
    } catch (error) {
      this.user = null;
    }
  }

  calcular_noches() {
    if (this.fecha_check_in && this.fecha_check_out) {
      const diffInMs = this.fecha_check_out.getTime() - this.fecha_check_in.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      this.noches = diffInDays;
      this.calcular_total();
    }
  }

  calcular_total() {
    let costo_diario = this.alojamiento.desde_noche;
    if (this.meses > 1) {
      costo_diario = this.alojamiento.desde_mes / 30;
    }
    this.total = this.noches * costo_diario;
  }

  do_reservation() {
    if (this.user) {
      let reserva: any = {
        client_id: this.user.item_id,
        alojamiento_id: this.alojamiento.item_id,
        total: this.total,
        pagado: false,
        huespedes: this.huespedes,
        fecha_in: this.fecha_check_in,
        fecha_out: this.fecha_check_out,
        noches: this.noches,
        user: {
          fullname: this.user.fullname,
          identification: this.user.identification,
          phone_number: this.user.phone_number,
          email: this.user.email
        }
      };
      this.reservation.emit(reserva);
      this.cancel_modal.emit(true);
    } else {
      Swal.fire({
        title: 'Usuario no autenticado!',
        text: 'Para continuar, por favor inicia sesión',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo continuar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.login_modal.emit(true);
        } else {
          this.cancel_modal.emit(true);
        }
      });
    }

  }
}

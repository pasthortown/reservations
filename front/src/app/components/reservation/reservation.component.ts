import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StarsComponent } from "../stars/stars.component";
import { ThemeDirective, CardFooterComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, ButtonCloseDirective, ButtonGroupComponent, ButtonToolbarComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, StarsComponent,  ButtonCloseDirective, ButtonDirective,  FormsModule, ButtonGroupComponent, ButtonToolbarComponent, ThemeDirective, CardFooterComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  @Input('type_of_reservation')  type_of_reservation: string = '';
  @Output('cancel_modal') cancel_modal: EventEmitter<any> = new EventEmitter();
  noches: number = 0;
  meses: number = 0;
  fecha_check_in: string = '1986-09-15';
  fecha_check_out: string = '1986-09-15';
  total: number = 0;
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
    propietario: '',
  };

  constructor() {
    const today = new Date();
    this.fecha_check_in = this.formatDate(today);
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);
    this.fecha_check_out = this.formatDate(threeDaysLater);
    this.calcular_noches();
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
    this.calcular_noches();
  }

  calcular_noches() {
    const date1 = new Date(this.fecha_check_in);
    const date2 = new Date(this.fecha_check_out);
    const differenceInTime = date2.getTime() - date1.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    this.noches = differenceInDays;
    const monthsOf30Days = differenceInDays / 30;
    this.meses = monthsOf30Days;
    this.calcular_total();
  }

  calcular_total() {
    let costo_diario = this.alojamiento.desde_noche;
    if (this.meses > 1) {
      costo_diario = this.alojamiento.desde_mes / 30;
    }
    this.total = this.noches * costo_diario;
  }

  do_reservation() {
    // aqui hacer la reserva
    this.cancel_modal.emit(true);
  }
}

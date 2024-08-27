import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroItemComponent } from '../hero-item/hero-item.component';
import { CatalogService } from '../../services/catalog.service';
import { FilesService } from '../../services/file.service';
import { MapComponent } from "../map/map.component";

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
  FormLabelDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardLinkDirective,
  CardSubtitleDirective,
  CardTextDirective,
  CardTitleDirective,
  BadgeModule
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AlojamientoPreviewComponent } from './alojamiento-preview/alojamiento-preview.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    LoginComponent, ProfileComponent, AlojamientoPreviewComponent, HeroItemComponent, BadgeModule, MapComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, FormFloatingDirective, FormDirective, FormSelectDirective, FormsModule, ButtonGroupComponent, ButtonToolbarComponent, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective],
  providers: [CatalogService, FilesService],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  @Input('precio')  precio: string = '';
  @Input('zona') zona: string = '';
  @Input('personas') personas: number = 0;
  @Input('habitaciones') habitaciones: number = 0;

  filter: any = {
    precio: '',
    zona: '',
    personas: 0,
    habitaciones: 0
  }

  @Input('visible_map') visible_map: boolean = false;
  @Output('map_is_close') map_is_close: EventEmitter<any> = new EventEmitter();
  @Input('visible_login') visible_login: boolean = false;
  @Output('login_is_close') login_is_close: EventEmitter<any> = new EventEmitter();
  @Input('visible_profile') visible_profile: boolean = false;
  @Output('profile_is_close') profile_is_close: EventEmitter<any> = new EventEmitter();

  markers: any[] = [];
  servicios: any[] = [];
  condiciones: any[] = [];
  propietarios: any[] = [];
  alojamientos: any[] = [];
  alojamientos_shown: any[] = [];
  visible: boolean = false;
  alojamiento_selected: any = {
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

  constructor(private catalogService: CatalogService, private fileService: FilesService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  get_catalog() {
    this.propietarios = [];
    this.servicios = [];
    this.condiciones=[];
    this.alojamientos = [];
    this.alojamiento_selected = {
      nombre: '',
      descripcion: '',
      personas: 0,
      metros: 0,
      habitaciones: 0,
      banos: 0,
      desde_noche: 0,
      desde_mes: 0,
      zona: '',
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
    let output_model = {
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
      galery: true,
      condiciones: true,
      servicios: true,
      rate: true,
      comentarios: true,
      hide: true,
    }
    this.catalogService.get_items('propietarios', { name: true }).then( r => {
      this.propietarios = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('servicios', { name: true, ico: true, description: true }).then( r => {
      this.servicios = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('condiciones', { name: true, ico: true, description: true  }).then( r => {
      this.condiciones = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('alojamientos', output_model).then( r_alojamientos => {
      this.markers = [];
      this.alojamientos = r_alojamientos.response;
      this.alojamientos.forEach((place: any) => {
        try {
          let new_marker_position: google.maps.LatLngLiteral = {
            lat: place.ubication.lat,
            lng: place.ubication.lng
          };
          this.markers.push({place: place, position: new_marker_position});
        } catch (error) {
          //ignored
        }
      });
      this.alojamientos.forEach((alojamiento: any) => {
        alojamiento.images = [];
        alojamiento.rate=0;
        if (alojamiento.galery) {
          if(alojamiento.galery.length > 0) {
            alojamiento.galery.forEach((element: any) => {
              this.fileService.get_file('fotografias_alojamientos', element).then(r => {
                alojamiento.images.push(r.response);
                if (r.response.favorite) {
                  alojamiento.portada = r.response;
                }
              }).catch( e => console.log(e) );
            });
          }
        }
      });
      this.filterData();
    }).catch( e => console.log(e) );
  }

  filterData() {
    const { precio, zona, personas, habitaciones } = this.filter;
    const [precioMin, precioMax] = precio
      ? precio.split('-').map((value: string) => Number.parseInt(value))
      : [0, Infinity];
    this.alojamientos_shown = this.alojamientos.filter(alojamiento =>
      (precio ?
        (alojamiento.desde_noche >= precioMin && alojamiento.desde_noche <= precioMax) ||
        (alojamiento.desde_mes >= precioMin && alojamiento.desde_mes <= precioMax)
        : true
      ) &&
      (zona ? alojamiento.zona.toString().toLowerCase().includes(zona.toLowerCase()) : true) &&
      (personas > 0 ? alojamiento.personas === personas : true) &&
      (habitaciones > 0 ? alojamiento.habitaciones === habitaciones : true)
    );
  }

  cancelar() {
    this.visible = false;
    this.visible_map = false;
    this.visible_login = false;
    this.visible_profile = false;
    this.map_is_close.emit(false);
    this.login_is_close.emit(false);
    this.profile_is_close.emit(false);
    this.get_catalog();
  }

  handleChangeMap(event: any) {
    this.visible_map = event;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  handleChangeLogin(event: any) {
    this.visible_login = event;
  }

  handleChangeProfile(event: any) {
    this.visible_profile = event;
  }

  marker_selected(place: any) {
    this.alojamientos.forEach((element: any) => {
      if (place.item_id == element.item_id) {
        this.alojamiento_selected = element;
        this.visible_map = false;
        this.visible = true;
      }
    });
  }

  ngOnChanges() {
    this.filter = {
      precio: this.precio,
      zona: this.zona,
      personas: this.personas,
      habitaciones: this.habitaciones
    };
    this.filterData();
  }
}

import { MapComponent } from './../components/map/map.component';
import { FileDropComponent } from './../components/file-drop/file-drop.component';
import { StarsComponent } from './../components/stars/stars.component';
import { FilesService } from 'src/app/services/file.service';
import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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

import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alojamientos',
  standalone: true,
  templateUrl: './alojamientos.component.html',
  styleUrl: './alojamientos.component.scss',
  providers:[CatalogService, FilesService],
  imports: [
    BadgeModule, MapComponent, FileDropComponent, StarsComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, FormFloatingDirective, FormDirective, FormSelectDirective, FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink]
})
export class AlojamientosComponent implements OnInit{
  filter = '';

  galeria: any[] = [];
  servicios: any[] = [];
  condiciones: any[] = [];
  propietarios: any[] = [];
  selected_service: any = null;
  selected_condition: any = null;
  selected_propietario: any = null;

  alojamientos: any[] = [];
  alojamientos_shown: any[] = [];
  alojamiento_selected: any = {
    nombre: '',
    personas: 0,
    metros: 0,
    habitaciones: 0,
    banos: 0,
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
    comentarios: []
  };
  public visible = false;
  is_new = false;

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
      comentarios: []
    };
    let output_model = {
      nombre: true,
      personas: true,
      metros: true,
      habitaciones: true,
      banos: true,
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
      comentarios: true
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
    this.catalogService.get_items('alojamientos', output_model).then( r => {
      this.alojamientos = r.response;
      this.alojamientos.forEach((alojamiento: any) => {
        alojamiento.images = [];
        alojamiento.rate=0;
        if(alojamiento.galery) {
          alojamiento.galery.forEach((element: any) => {
            this.fileService.get_file('fotografias_alojamientos', element).then(r => {
              alojamiento.images.push(r.response);
            }).catch( e => console.log(e) );
          });
        }
      });
      this.filterData();
    }).catch( e => console.log(e) );
  }

  filterData() {
    const lowerCaseFilter = this.filter.toLowerCase();
    this.alojamientos_shown = this.alojamientos.filter(alojamiento =>
      Object.values(alojamiento).some((value: any) =>
        value.toString().toLowerCase().includes(lowerCaseFilter)
      )
    );
  }

  cancelar() {
    this.visible = !this.visible;
    this.get_catalog();
  }

  handleChange(event: any) {
    this.visible = event;
  }

  new_item() {

  }

  delete_item(item: any, catalog: string) {
    this.catalogService.delete_item(catalog, item.item_id).then(r => {
      this.fileService.delete_file('fotografias_alojamientos', item.image_id);
      this.get_catalog();
    }).catch( e => console.log(e) );
  }

  cargar_portada(event: any) {
    if (event.validated) {
      this.galeria = event.files;
    }
  }

  do_select_condition(condition_id: string) {
    this.condiciones.forEach((condition: any) => {
      if (condition.item_id == condition_id) {
        this.selected_condition = condition;
      }
    });
  }

  do_select_service(service_id: string) {
    this.servicios.forEach((service: any) => {
      if (service.item_id == service_id) {
        this.selected_service = service;
      }
    });
  }

  do_select_propietario(propietario_id: string) {
    this.propietarios.forEach((propietario: any) => {
      if (propietario.item_id == propietario_id) {
        this.selected_propietario = propietario;
      }
    });
  }
  add_condition(condition: any) {
    if (this.selected_condition == null) {
      return;
    }
    if (!this.alojamiento_selected.condiciones) {
      this.alojamiento_selected.condiciones = [];
    }
    let existe = false;
    this.alojamiento_selected.condiciones.forEach((element: any)=> {
      if (element.item_id == condition.item_id) {
        existe = true;
      }
    });
    if (!existe) {
      this.alojamiento_selected.condiciones.push(condition);
    }
  }

  add_service(service: any) {
    if (this.selected_service == null) {
      return;
    }
    if (!this.alojamiento_selected.servicios) {
      this.alojamiento_selected.servicios = [];
    }
    let existe = false;
    this.alojamiento_selected.servicios.forEach((element: any)=> {
      if (element.item_id == service.item_id) {
        existe = true;
      }
    });
    if (!existe) {
      this.alojamiento_selected.servicios.push(service);
    }
  }

  delete_service(service_id: string) {
    this.alojamiento_selected.servicios = this.alojamiento_selected.servicios.filter((servicio: any) => servicio.item_id !== service_id);
  }

  delete_condition(condition_id: string) {
    this.alojamiento_selected.condiciones = this.alojamiento_selected.condiciones.filter((condicion: any) => condicion.item_id !== condition_id);
  }

  save() {
    this.alojamiento_selected.galery.forEach((element: any) => {
      this.fileService.delete_file('fotografias_alojamientos', element);
    });
    
  }
}

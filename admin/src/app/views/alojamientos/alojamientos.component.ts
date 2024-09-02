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
import Swal from 'sweetalert2';

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
  zonas: any[] = [];
  selected_service: any = null;
  selected_condition: any = null;
  selected_propietario: any = null;

  alojamientos: any[] = [];
  alojamientos_shown: any[] = [];
  alojamiento_selected: any = {
    nombre: '',
    personas: 0,
    reservas: [],
    metros: 0,
    habitaciones: 0,
    banos: 0,
    desde_noche: 0,
    desde_mes: 0,
    propietario: '',
    descripcion: '',
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
  public visible = false;
  public visible_map = false;
  public visible_comments = false;
  files_validated = false;
  is_new = false;

  constructor(private catalogService: CatalogService, private fileService: FilesService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  update_map_cords(data: any) {
    this.alojamiento_selected.ubication = data;
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
      reservas: [],
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
      propietario: '',
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
      desde_noche: true,
      zona: true,
      desde_mes: true,
      descripcion: true,
      ubication: true,
      check_in: true,
      check_out: true,
      galery: true,
      condiciones: true,
      propietario: true,
      servicios: true,
      rate: true,
      comentarios: true,
      hide: true,
    }
    this.catalogService.get_items('zonas', { name: true }).then( r => {
      this.zonas = r.response;
    }).catch( e => console.log(e) );
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
      this.alojamientos = r_alojamientos.response;
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
        let reserva_output_model: any = {
          client_id: true,
          alojamiento_id: true,
          total: true,
          huespedes: true,
          fecha_in: true,
          fecha_out: true,
          noches: true
        }
        alojamiento.reservas = [];
        this.catalogService.search_items('reservas', 'alojamiento_id', alojamiento.item_id, reserva_output_model).then(r_reserva => {
          alojamiento.reservas = r_reserva.response;
        }).catch( e => console.log(e) );
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
    this.visible = false;
    this.visible_comments = false;
    this.visible_map = false;
    this.get_catalog();
  }

  handleChangeComments(event: any) {
    this.visible_comments = event;
  }

  handleChangeMap(event: any) {
    this.visible_map = event;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  new_item() {
    this.alojamiento_selected = {
      nombre: '',
      personas: 0,
      reservas: [],
      metros: 0,
      habitaciones: 0,
      banos: 0,
      desde_noche: 0,
      desde_mes: 0,
      descripcion: '',
      propietario: '',
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
      hide: false
    };
    this.is_new = true;
  }

  update_item(item: any, catalog: string) {
    this.catalogService.update_item(catalog, item.item_id, item).then(r => {
      this.get_catalog();
    }).catch( e => console.log(e) );
  }

  upload_item(item: any, catalog: string) {
    this.catalogService.upload_items(catalog, [item]).then(r => {
      this.get_catalog();
    }).catch( e => console.log(e) );
  }

  delete_item(item: any, catalog: string) {
    Swal.fire({
      title: 'Confirmación de Seguridad!',
      text: 'Está seguro de continuar con la eliminación del elemento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        item.galery.forEach((element: any) => {
          this.fileService.delete_file('fotografias_alojamientos', element.image_id);
        });
        this.catalogService.delete_item(catalog, item.item_id).then(r => {
          this.get_catalog();
        }).catch( e => console.log(e) );
      } else {
        this.get_catalog();
      }
    });
  }

  cargar_galeria(event: any) {
    this.files_validated = event.validated;
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
    let alojamiento_to_save: any = {
      nombre: this.alojamiento_selected.nombre,
      personas: this.alojamiento_selected.personas,
      metros: this.alojamiento_selected.metros,
      habitaciones: this.alojamiento_selected.habitaciones,
      banos: this.alojamiento_selected.banos,
      desde_noche: this.alojamiento_selected.desde_noche,
      desde_mes: this.alojamiento_selected.desde_mes,
      descripcion: this.alojamiento_selected.descripcion,
      zona: this.alojamiento_selected.zona,
      ubication: this.alojamiento_selected.ubication,
      check_in: this.alojamiento_selected.check_in,
      check_out: this.alojamiento_selected.check_out,
      propietario: this.alojamiento_selected.propietario,
      galery: [],
      condiciones: this.alojamiento_selected.condiciones,
      servicios: this.alojamiento_selected.servicios,
      rate: this.is_new ? 0 : this.alojamiento_selected.rate,
      comentarios: this.is_new ? [] : this.alojamiento_selected.comentarios
    };
    if (this.alojamiento_selected.galery) {
      this.alojamiento_selected.galery.forEach((element: any) => {
        this.fileService.delete_file('fotografias_alojamientos', element);
      });
    }
    const galeriaFiltrada = this.galeria.filter((obj, index, self) =>
      index === self.findIndex((t) => t.name === obj.name)
    );
    this.fileService.upload_files('fotografias_alojamientos', galeriaFiltrada).then( r_imagenes => {
      if (r_imagenes.status == 200) {
        alojamiento_to_save.galery = [];
        for (let i = 0; i < galeriaFiltrada.length; i++) {
          r_imagenes.response.forEach((element: any) => {
            if (galeriaFiltrada[i].name == element.name) {
              alojamiento_to_save.galery.push(element.file_id)
            }
          });
        }
        if (this.is_new) {
          this.upload_item(alojamiento_to_save, 'alojamientos');
        } else {
          alojamiento_to_save.item_id = this.alojamiento_selected.item_id;
          this.update_item(alojamiento_to_save, 'alojamientos');
        }
      }
    }).catch( e => console.log(e) );
    this.visible = !this.visible;
  }

  hide_alojamiento(alojamiento: any) {
    alojamiento.hide = !alojamiento.hide;
    this.update_item(alojamiento, 'alojamientos');
  }
}

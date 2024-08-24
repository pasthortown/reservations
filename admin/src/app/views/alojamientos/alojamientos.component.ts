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
  CardTitleDirective
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
    CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, FormFloatingDirective, FormDirective, FormSelectDirective, FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink]
})
export class AlojamientosComponent implements OnInit{
  filter = '';
  alojamientos: any[] = [];
  alojamientos_shown: any[] = [];
  alojamiento_selected = {
    nombre: '',
    personas: '',
    metros: 0,
    habitaciones: 0,
    banos: 0,
    desde_noche: 0,
    desde_mes: 0,
    descripcion: '',
    latitude: 0,
    longitude: 0,
    ubication: {
        lat: 0,
        lng: 0
    },
    check_in: null,
    check_out: null,
    image_id: '',
    galery: [],
    condiciones: [],
    servicios: [],
    images: [],
    rate: 0,
    comments: []
  };
  public visible = false;
  is_new = false;

  constructor(private catalogService: CatalogService, private fileService: FilesService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  get_catalog() {
    this.alojamientos = [];
    this.alojamiento_selected = {
      nombre: '',
      personas: '',
      metros: 0,
      habitaciones: 0,
      banos: 0,
      desde_noche: 0,
      desde_mes: 0,
      descripcion: '',
      latitude: 0,
      longitude: 0,
      ubication: {
          lat: 0,
          lng: 0
      },
      check_in: null,
      check_out: null,
      image_id: '',
      galery: [],
      condiciones: [],
      servicios: [],
      images: [],
      rate: 0,
      comments: []
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
      latitude: true,
      longitude: true,
      ubication: true,
      check_in: true,
      check_out: true,
      image_id: true,
      galery: true,
      condiciones: true,
      servicios: true,
      rate: true,
      comments: true
    }
    this.catalogService.get_items('alojamientos', output_model).then( r => {
      this.alojamientos = r.response;
      this.alojamientos.forEach((alojamiento: any) => {
        alojamiento.images = [];
        alojamiento.rate=0;
        this.fileService.get_file('fotografias_alojamientos', alojamiento.image_id).then(r => {
          alojamiento.images.push(r.response)
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
      this.get_catalog();
    }).catch( e => console.log(e) );
  }
}

import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../../../services/catalog.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  modal_new_place: NgbModalRef | undefined;
  zonas: any[] = [];
  precios: any[] = [];
  servicios: any[] = [];
  condiciones: any[] = [];
  places: any[] = [];
  selected: any = null;
  newzone: any = { name: '' };
  newprice: any = { name: '' };
  newcondition: any = {
    ico: '',
    name: '',
    description: ''
  };
  newservice: any = {
    ico: '',
    name: '',
    description: ''
  };
  new_place: any = {
    image_id: '',
    item_id: '',
    nombre: '',
    personas: 0,
    metros: 0,
    habitaciones: 0,
    banos: 0,
    desde_noche: 0,
    check_out_time: '',
    check_in_time: '',
    desde_mes: 0,
    descripcion: '',
    ubication: {
      lat: 0,
      lng: 0
    },
    condiciones: [],
    servicios: [],
    galery: []
  };
  place_selected: any = null;
  active_page: string = 'places';

  constructor(private catalogService: CatalogService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.get_catalogs();
    this.get_alojamientos();
  }

  add_new_place(modal: any) {
    this.new_place = {
      image_id: '',
      item_id: '',
      nombre: '',
      personas: 0,
      metros: 0,
      habitaciones: 0,
      banos: 0,
      desde_noche: 0,
      check_out_time: '',
      check_in_time: '',
      desde_mes: 0,
      descripcion: '',
      ubication: {
        lat: 0,
        lng: 0
      },
      condiciones: [],
      servicios: [],
      galery: []
    };
    this.modal_new_place = this.modalService.open(modal, { centered: true, size: 'xl', backdrop: 'static', keyboard: false });
  }

  get_alojamientos() {
    this.place_selected = null;
    this.places = [];
    let output_model: any = {
      banos: true,
      condiciones: true,
      descripcion: true,
      desde_mes: true,
      desde_noche: true,
      check_out_time: true,
      check_in_time: true,
      galery: true,
      habitaciones: true,
      image_id: true,
      metros: true,
      nombre: true,
      personas: true,
      servicios: true,
      ubication: true
    }
    this.catalogService.get_items('alojamientos', output_model).then( r => {
      if (r.status == 200) {
        this.places = r.response;
      }
    }).catch( e => console.log(e) );
  }

  get_catalogs() {
    this.zonas = [];
    this.precios = [];
    this.servicios = [];
    this.condiciones=[];
    this.selected = null;
    this.newzone = { name: '' };
    this.catalogService.get_items('zonas', { name: true }).then( r => {
      this.zonas = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('precios', { name: true }).then( r => {
      this.precios = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('servicios', { name: true, ico: true, description: true }).then( r => {
      this.servicios = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('condiciones', { name: true, ico: true, description: true  }).then( r => {
      this.condiciones = r.response;
    }).catch( e => console.log(e) );
  }

  filter(data: any) {
    console.log(data);
  }

  select(item: any){
    this.selected = item;
  }

  update_item(item: any, catalog: string) {
    this.catalogService.update_item(catalog, item.item_id, item).then(r => {
      this.get_catalogs();
    }).catch( e => console.log(e) );
  }

  delete_item(item: any, catalog: string) {
    this.catalogService.delete_item(catalog, item.item_id).then(r => {
      this.get_catalogs();
    }).catch( e => console.log(e) );
  }

  upload_item(item: any, catalog: string) {
    this.catalogService.upload_items(catalog, [item]).then(r => {
      this.get_catalogs();
    }).catch( e => console.log(e) );
  }
}

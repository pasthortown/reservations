import { CatalogService } from './../../../services/catalog.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from '../../../services/file.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  @Output('submit_cancel') sumbitCancelEmitter: EventEmitter<any> = new EventEmitter();
  @Output('submit_edit') sumbitEditEmitter: EventEmitter<any> = new EventEmitter();
  @Output('submit_save') sumbitSaveEmitter: EventEmitter<any> = new EventEmitter();
  @Input('show_edit') show_edit: boolean = false;
  @Input('is_admin') is_admin: boolean = false;
  @Input('editable') editable: boolean = true;
  @Input('place') place: any = {
    image_id: '',
    item_id: '',
    nombre: '',
    personas: 1,
    metros: 1,
    habitaciones: 1,
    banos: 1,
    desde_noche: 1,
    desde_mes: 1,
    check_out_time: '',
    check_in_time: '',
    descripcion: '',
    ubication: {
      lat: 0,
      lng: 0
    },
    condiciones: [],
    servicios: [],
    galery: []
  }
  servicios: any[] = [];
  condiciones: any[] = [];
  modal_map: NgbModalRef | undefined;
  modal_reserve: NgbModalRef | undefined;
  modal_fullsize: NgbModalRef | undefined;
  max_file_size: number = 10;
  validate_file_size: boolean = false;
  validate_files_size: boolean = false;
  selected_service: any = null;
  selected_condition: any = null;
  galery: any[] = [];
  portada: any[] = [];

  constructor(private modalService: NgbModal, private catalogService: CatalogService, private fileService: FilesService){}

  send(value: any) {
    console.log(value);
  }

  ngOnInit() {
    this.get_catalogs();
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

  delete_service(service_id: string) {
    this.place.servicios = this.place.servicios.filter((servicio: any) => servicio.item_id !== service_id);
  }

  delete_condition(condition_id: string) {
    this.place.condiciones = this.place.condiciones.filter((condicion: any) => condicion.item_id !== condition_id);
  }

  get_catalogs() {
    this.servicios = [];
    this.condiciones=[];
    this.catalogService.get_items('servicios', { name: true, ico: true, description: true }).then( r => {
      this.servicios = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('condiciones', { name: true, ico: true, description: true  }).then( r => {
      this.condiciones = r.response;
    }).catch( e => console.log(e) );
  }

  get_image(array_to_push: any[], image_id: string, folder: string) {
    if (this.place.image_id !== undefined) {
      if (this.place.image_id != '') {
        this.fileService.get_file(folder, image_id).then(r => {
          array_to_push.push(r.response);
        }).catch( e => console.log(e) );
      }
    }
  }

  get_images() {
    this.portada = [];
    this.galery = [];
    this.get_image(this.portada, this.place.image_id, 'fotografias_alojamientos');
    if (this.place.galery) {
      if (this.editable) {
        if (this.place.galery.length > 0) {
          this.place.galery.forEach((image_id: string) => {
            this.get_image(this.galery, image_id, 'fotografias_alojamientos');
          });
        }
      }
    }
  }

  ngOnChanges() {
    this.get_images();
  }

  add_condition(condition: any) {
    if (this.selected_condition == null) {
      return;
    }
    if (!this.place.condiciones) {
      this.place.condiciones = [];
    }
    let existe = false;
    this.place.condiciones.forEach((element: any)=> {
      if (element.item_id == condition.item_id) {
        existe = true;
      }
    });
    if (!existe) {
      this.place.condiciones.push(condition);
    }
  }

  add_service(service: any) {
    if (this.selected_service == null) {
      return;
    }
    if (!this.place.servicios) {
      this.place.servicios = [];
    }
    let existe = false;
    this.place.servicios.forEach((element: any)=> {
      if (element.item_id == service.item_id) {
        existe = true;
      }
    });
    if (!existe) {
      this.place.servicios.push(service);
    }
  }

  show_full_size(content_fullsize: any) {
    this.modal_fullsize = this.modalService.open(content_fullsize, { centered: true, size: 'xl', backdrop: 'static', keyboard: false });
  }

  show_reserve(content_reserve: any) {
    this.modal_reserve = this.modalService.open(content_reserve, { centered: true, size: 'xl', backdrop: 'static', keyboard: false });
  }

  show_map(content_map: any) {
    this.modal_map = this.modalService.open(content_map, { centered: true, size: 'xl', backdrop: 'static', keyboard: false });
  }

  cargar_portada(event: any) {
    if (event.validated) {
      this.portada = event.files;
    }
  }

  cargar_galery(event: any) {
    if (event.validated) {
      this.galery = event.files;
    }
  }

  save_pace(place: any) {
    let actualizar: boolean = false;
    if (place.item_id) {
      actualizar = true;
      const toUpload = [...this.portada, ...this.galery];
      const toDelete = [this.place.image_id, ...this.place.galery];
      for (let i = 0; i < toUpload.length; i++) {
        this.fileService.delete_file('fotografias_alojamientos',toDelete[i]);
      }
      toUpload.forEach((element: any) => {
        delete element.file_id;
        delete element.timestamp;
      });
      this.fileService.upload_files('fotografias_alojamientos', toUpload).then( r_imagenes => {
        if (r_imagenes.status == 200) {
          place.galery = [];
          for (let i = 0; i < r_imagenes.response.length; i++) {
            if (i == 0) {
              place.image_id = r_imagenes.response[i].file_id;
            } else {
              place.galery.push(r_imagenes.response[i].file_id);
            }
          }
          this.catalogService.update_item('alojamientos', place.item_id, place).then( r => {
            if (r.status == 200) {
              this.notificar();
            }
          }).catch( e => console.log(e) );
        }
      }).catch( e => console.log(e) );
    }
    if (actualizar == false) {
      const toUpload = [...this.portada, ...this.galery];
      this.fileService.upload_files('fotografias_alojamientos', toUpload).then( r_imagenes => {
        if (r_imagenes.status == 200) {
          for (let i = 0; i < r_imagenes.response.length; i++) {
            if (i == 0) {
              place.image_id = r_imagenes.response[i].file_id;
            } else {
              place.galery.push(r_imagenes.response[i].file_id);
            }
          }
          this.catalogService.upload_items('alojamientos', [place]).then( r => {
            if (r.status == 200) {
              this.notificar();
            }
          }).catch( e => console.log(e) );
        }
      }).catch( e => console.log(e) );
    }
  }

  notificar() {
    this.sumbitSaveEmitter.emit(true);
    this.place = {
      image_id: '',
      item_id: '',
      nombre: '',
      personas: 1,
      metros: 1,
      habitaciones: 1,
      banos: 1,
      desde_noche: 1,
      desde_mes: 1,
      check_out_time: '',
      check_in_time: '',
      descripcion: '',
      ubication: {
        lat: 0,
        lng: 0
      },
      condiciones: [],
      servicios: []
    }
  }

  update_map_cords(data: any) {
    this.place.ubication = data;
  }

  submit_edit(data: any) {
    this.sumbitEditEmitter.emit(true);
  }

  submit_cancel(data: any) {
    this.sumbitCancelEmitter.emit(true);
  }
}

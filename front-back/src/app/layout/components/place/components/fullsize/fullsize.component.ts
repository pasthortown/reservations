import { FilesService } from './../../../../../services/file.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullsize',
  templateUrl: './fullsize.component.html',
  styleUrl: './fullsize.component.scss'
})
export class FullsizeComponent {
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
  media: any[] = [];

  constructor(private fileService: FilesService){}

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
    this.media = [];
    this.get_image(this.media, this.place.image_id, 'fotografias_alojamientos');
    if (this.place.galery) {
      if (this.place.galery.length > 0) {
        this.place.galery.forEach((image_id: string) => {
          this.get_image(this.media, image_id, 'fotografias_alojamientos');
        });
      }
    }
  }

  ngOnChanges() {
    this.get_images();
  }
}

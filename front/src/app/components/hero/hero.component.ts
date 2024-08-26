import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { HeroItemComponent } from '../hero-item/hero-item.component';
import { CatalogService } from '../../services/catalog.service';
import { FilesService } from '../../services/file.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroItemComponent, HttpClientModule],
  providers: [CatalogService, FilesService],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  filter = '';
  servicios: any[] = [];
  condiciones: any[] = [];
  propietarios: any[] = [];
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
    this.catalogService.get_items('alojamientos', output_model).then( r => {
      this.alojamientos = r.response;
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
    const lowerCaseFilter = this.filter.toLowerCase();
    this.alojamientos_shown = this.alojamientos.filter(alojamiento =>
      Object.values(alojamiento).some((value: any) =>
        value.toString().toLowerCase().includes(lowerCaseFilter)
      )
    );
  }
}

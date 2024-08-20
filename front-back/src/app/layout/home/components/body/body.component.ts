import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../../../services/catalog.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  places: any[] = [];
  show_map: boolean = false;
  markers: any[] = [];

  constructor(private catalogService: CatalogService){}

  ngOnInit(): void {
    this.get_alojamientos();
  }

  get_alojamientos() {
    let output_model: any = {
      banos: true,
      condiciones: true,
      descripcion: true,
      desde_mes: true,
      desde_noche: true,
      galery: true,
      check_out_time: true,
      check_in_time: true,
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
        this.markers = [];
        this.places.forEach((place: any) => {
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

      }
    }).catch( e => console.log(e) );
  }

  marker_selected(place: any) {
    console.log(place);
  }

  filter(data: any) {
    console.log(data);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule, CommonModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit{
  @Output('coords_selected') coordsSelectedEmitter: EventEmitter<any> = new EventEmitter();
  @Output('marker_selected') markerSelectedEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('googleMap') googleMap!: GoogleMap;
  @Input('width') width: any = '100vw';
  @Input('height') height: any = '100vh';
  @Input('seleccionable') seleccionable: boolean = false;
  @Input('show_hints') show_hints: boolean = false;
  @Input('markers') markers: any[] = [];
  @Input('mapCenter') mapCenter: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };

  mi_infowindow = {
    pos_x: 0,
    pos_y: 0,
    title: '',
    description: '',
    src_img: '',
    visible: false
  };

  ngOnInit(): void {

  }

  mapOptions: google.maps.MapOptions = {
    streetViewControl: true,
    zoomControl: true,
    mapTypeControl: false,
    fullscreenControl: true,
    scrollwheel: false
  };

  onMouseWheel(event: WheelEvent) {
    if (event.ctrlKey || event.shiftKey) {
      this.googleMap.googleMap!.setOptions({ scrollwheel: true });
    } else {
      this.googleMap.googleMap!.setOptions({ scrollwheel: false });
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng && this.seleccionable) {
      this.markers = [];
      let coords = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.markers.push({position: coords});
      this.coordsSelectedEmitter.emit(coords);
    }
  }

  markerClick(place: any) {
    this.markerSelectedEmitter.emit(place);
  }

  mouseOver(event : any, place: any) {
    if (this.show_hints) {
      this.mi_infowindow.visible = true;
      this.mi_infowindow.title = place.nombre;
      this.mi_infowindow.description = place.descripcion;
      this.mi_infowindow.src_img = 'data:' + place.portada.type + ';base64,' + place.portada.file_base64;
      this.mi_infowindow.pos_x = event.domEvent.clientX;
      this.mi_infowindow.pos_y = event.domEvent.clientY;
    }
  }
}

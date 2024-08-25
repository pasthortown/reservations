import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMapsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  @Output('coords_selected') coordsSelectedEmitter: EventEmitter<any> = new EventEmitter();
  @Output('marker_selected') markerSelectedEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild('googleMap') googleMap!: GoogleMap;
  @Input('width') width: any = '100vw';
  @Input('height') height: any = '100vh';
  @Input('seleccionable') seleccionable: boolean = false;
  @Input('markers') markers: any[] = [];
  @Input('mapCenter') mapCenter: google.maps.LatLngLiteral = { lat: 40.730610, lng: -73.935242 };

  mapOptions: google.maps.MapOptions = {
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

  onMarkerClick(place: any) {
    this.markerSelectedEmitter.emit(place);
  }
}

import { Component, Input } from '@angular/core';
import { CarouselComponent, ThemeDirective, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselCaptionComponent, CardFooterComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FilesService } from '../../../services/file.service';
import { MapComponent } from "../../map/map.component";
import { StarsComponent } from "../../stars/stars.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alojamiento-preview',
  standalone: true,
  providers:[FilesService],
  imports: [RouterLink, ThemeDirective, CarouselComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselCaptionComponent, MapComponent, StarsComponent, CardFooterComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective],
  templateUrl: './alojamiento-preview.component.html',
  styleUrl: './alojamiento-preview.component.css'
})
export class AlojamientoPreviewComponent {
  currentIndex = 0;

  @Input('propietarios')  propietarios: any[] = [];
  @Input('alojamiento')  alojamiento: any = {
    nombre: '',
    personas: 0,
    metros: 0,
    habitaciones: 0,
    banos: 0,
    zona: '',
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
    propietario: '',
  };

  propietario: any = null;

  constructor(private fileService:FilesService) {}

  ngOnChanges() {
    if (this.alojamiento.propietario != '') {
      console.log(this.alojamiento);
      this.propietarios.forEach((element: any) => {
        if (element.item_id == this.alojamiento.propietario) {
          this.propietario = element;
          this.fileService.get_file('fotografias_propietarios', this.propietario.photo_id).then( r => {
            this.propietario.photo = r.response;
          }).catch( e => console.log(e) );
        }
      });
    }
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.alojamiento.images.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.alojamiento.images.length - 1) ? 0 : this.currentIndex + 1;
  }
}

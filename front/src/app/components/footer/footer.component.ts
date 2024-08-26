import { Component } from '@angular/core';
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SlideMenuComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  popularItems = [
    {
      title: 'Sobre nosotros',
      data: [
        { key: 'aboutUs', value: 'Luxuria Stays es una empresa creada con el propósito se alquilar apartamentos para cortas y largas estancias, colaborando con diferentes propietarios de diferentes ciudades del mundo.' },
      ],
    },
    {
      title: 'Oficinas',
      data: [
        { key: 'street', value: 'Av. Amazonas y Corea' },
        { key: 'city', value: 'Quito - Ecuador' },
      ],
    },
    {
      title: 'Contacto',
      data: [
        { key: 'phone', value: '+593 99 658 3107' },
        { key: 'email', value: 'luis.salazar@kfc.com.ec' },
        { key: 'schedule', value: 'De lunes a viernes de 9:30h a 19:30h' },
      ],
    },
  ];
}

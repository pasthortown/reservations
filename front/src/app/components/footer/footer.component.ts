import { Component } from '@angular/core';

import { FormDefault, MenuItem } from '../../models/models';
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SlideMenuComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  menuItems: MenuItem[] = [
    {
      img: '',
      title: 'Popular',
    },
    {
      img: '',
      title: 'Arts & culture',
    },
    {
      img: '',
      title: 'Outdoors',
    },
    {
      img: '',
      title: 'Mountains',
    },
    {
      img: '',
      title: 'Beach',
    },
    {
      img: '',
      title: 'Unique stays',
    },
    {
      img: '',
      title: 'Categories',
    },
    {
      img: '',
      title: 'Things todo',
    },
    {
      img: '',
      title: 'Travel tips & inspiration',
    },
    {
      img: '',
      title: 'Airbnb-friendly apartments',
    },
  ];

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
  supportItems: string[] = [
    'Support',
    'Help Center',
    'AirCover',
    'Anti-discrimination',
    'Disability support',
    'Cancellation options',
    'Report neighborhood concern',
  ];
  hostingItems: string[] = [
    'Hosting',
    'Airbnb your home',
    'AirCover for Host',
    'Hosting resources',
    'Community forum',
    'Hosting responsibly',
    'Airbnb-friendly apartments',
    'Join a free Hosting class',
  ];
  airbnbItems: string[] = [
    'Airbnb',
    'Newsroom',
    'New features',
    'Careers',
    'Investors',
    'Gift cards',
    'Airbnb.org emergency stays',
  ];
}

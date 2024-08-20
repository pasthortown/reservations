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
  popularItems: FormDefault[] = [
    {
      title: 'Canmore',
      subTitle: 'Apartment rentals',
    },
    {
      title: 'Benalmadena',
      subTitle: 'Apartment rentals',
    },
    {
      title: 'Marbella',
      subTitle: 'House rentals',
    },
    {
      title: 'Mijas',
      subTitle: 'Vacation rentals',
    },
    {
      title: 'Prescott',
      subTitle: 'Apartment rentals',
    },
    {
      title: 'Scootdale',
      subTitle: 'Vacation rentals',
    },
    {
      title: 'Jasper',
      subTitle: 'Cabin rentals',
    },
    {
      title: 'Tucson',
      subTitle: 'Car rentals',
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

import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Administración',
    title: true
  },
  {
    name: 'Alojamientos',
    url: '/alojamientos',
    iconComponent: { name: 'cil-building' },
  },
  {
    name: 'Catálogos',
    url: '/catalogos',
    iconComponent: { name: 'cil-folder-open' },
    children: [
      {
        name: 'Zonas',
        url: '/catalogos/zonas',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Precios',
        url: '/catalogos/precios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Servicios',
        url: '/catalogos/servicios',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Condiciones',
        url: '/catalogos/condiciones',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Reportes',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts'
  }
];

import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Administración',
    title: true
  },
  {
    name: 'Alojamientos',
    url: '/base',
    iconComponent: { name: 'cil-building' },
    children: [
      {
        name: 'Administrar',
        url: '/alojamientos/administrar',
        icon: 'nav-icon-bullet'
      },
    ]
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
        url: '/buttons/dropdowns',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Condiciones',
        url: '/buttons/button-groups',
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

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
        url: '/base/accordion',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Catálogos',
    url: '/buttons',
    iconComponent: { name: 'cil-folder-open' },
    children: [
      {
        name: 'Zonas',
        url: '/buttons/buttons',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Precios',
        url: '/buttons/button-groups',
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

import { HttpClientModule } from '@angular/common/http';
import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { FilesService } from 'src/app/services/file.service';
import { CatalogService } from 'src/app/services/catalog.service';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

interface IChartProps {
  data?: [];
  labels?: any;
  options?: ChartOptions;
  colors?: any;
  type: string;
  legend?: any;

  [propName: string]: any;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers:[CatalogService, FilesService],
  standalone: true,
  imports: [HttpClientModule, WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})

export class DashboardComponent implements OnInit {
  alojamientos: any[] = [];
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);

  public mainChart: any = {};
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  constructor(private catalogService: CatalogService, private fileService: FilesService) {}

  ngOnInit(): void {
    this.get_catalog();
    this.initCharts();
    this.updateChartOnColorModeChange();
  }

  get_catalog() {
    this.alojamientos = [];
    let output_model = {
      nombre: true,
      personas: true,
      metros: true,
      habitaciones: true,
      banos: true,
      desde_noche: true,
      zona: true,
      desde_mes: true,
      descripcion: true,
      ubication: true,
      check_in: true,
      check_out: true,
      galery: true,
      condiciones: true,
      propietario: true,
      servicios: true,
      rate: true,
      comentarios: true,
      hide: true,
    }
    this.catalogService.get_items('alojamientos', output_model).then( r_alojamientos => {
      this.alojamientos = r_alojamientos.response;
      this.alojamientos.forEach((alojamiento: any) => {
        if (!alojamiento.comentarios) {
          alojamiento.comentarios = [];
        }
        alojamiento.images = [];
        if (alojamiento.galery) {
          if(alojamiento.galery.length > 0) {
            alojamiento.galery.forEach((element: any) => {
              this.fileService.get_file('fotografias_alojamientos', element).then(r => {
                alojamiento.images.push(r.response);
                if (r.response.favorite) {
                  alojamiento.portada = r.response;
                }
              }).catch( e => console.log(e) );
            });
          }
        }
        let reserva_output_model: any = {
          client_id: true,
          alojamiento_id: true,
          pago: true,
          total: true,
          huespedes: true,
          fecha_in: true,
          fecha_out: true,
          noches: true
        }
        alojamiento.reservas = [];
        this.catalogService.search_items('reservas', 'alojamiento_id', alojamiento.item_id, reserva_output_model).then(r_reserva => {
          alojamiento.reservas = r_reserva.response;
        }).catch( e => console.log(e) );
      });
    }).catch( e => console.log(e) );
  }

  initCharts(): void {
    //this.mainChart = [];
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        this.mainChartRef().update();
      });
    }
  }
}

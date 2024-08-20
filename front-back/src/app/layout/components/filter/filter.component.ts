import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output('submit') submitEmitter: EventEmitter<any> = new EventEmitter();

  zonas: any[] = [];
  precios: any[] = [];
  data: any = {
    zona: '*',
    fecha_in: new Date(new Date().setDate(new Date().getDate() + 5)),
    fecha_out: new Date(new Date().setDate(new Date().getDate() + 10)),
    personas: 1,
    precio: '*',
    habitaciones: 1
  };

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.get_catalogs();
  }

  get_catalogs() {
    this.catalogService.get_items('zonas', { name: true }).then( r => {
      this.zonas = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('precios', { name: true }).then( r => {
      this.precios = r.response;
    }).catch( e => console.log(e) );
  }

  submit() {
    this.submitEmitter.emit(this.data);
  }
}

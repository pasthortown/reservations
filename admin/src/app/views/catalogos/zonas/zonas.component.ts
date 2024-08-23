import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from './../../../../../../front-back/src/app/services/catalog.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ColComponent,
  RowComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  TextColorDirective,
  ThemeDirective,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
  PaginationComponent,
  PageItemComponent,
  PageLinkDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonGroupComponent,
  ButtonToolbarComponent,
  FormLabelDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zonas',
  standalone: true,
  templateUrl: './zonas.component.html',
  styleUrl: './zonas.component.scss',
  providers:[CatalogService],
  imports: [ FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink]
})
export class ZonasComponent implements OnInit{
  filter = '';
  zonas: any[] = [];
  zonas_shown: any[] = [];
  zone_selected = { name: '' };

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  get_catalog() {
    this.zonas = [];
    this.zone_selected = { name: '' };
    this.catalogService.get_items('zonas', { name: true }).then( r => {
      this.zonas = r.response;
      this.filterData();
    }).catch( e => console.log(e) );
  }

  filterData() {
    const lowerCaseFilter = this.filter.toLowerCase();
    this.zonas_shown = this.zonas.filter(zone =>
      zone.name.toLowerCase().includes(lowerCaseFilter)
    );
  }
}

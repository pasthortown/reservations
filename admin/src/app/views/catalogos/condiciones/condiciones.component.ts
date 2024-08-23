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
  selector: 'app-condiciones',
  standalone: true,
  templateUrl: './condiciones.component.html',
  styleUrl: './condiciones.component.scss',
  providers:[CatalogService],
  imports: [ FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink]
})
export class CondicionesComponent implements OnInit {
  filter = '';
  condiciones: any[] = [];
  condiciones_shown: any[] = [];
  condition_selected = { name: '', ico: '', description: '' };
  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  get_catalog() {
    this.condiciones = [];
    this.condition_selected = { name: '', ico: '', description: '' };
    this.catalogService.get_items('condiciones', { name: true, ico: true, description: true  }).then( r => {
      this.condiciones = r.response;
      this.filterData();
    }).catch( e => console.log(e) );
  }

  filterData() {
    const lowerCaseFilter = this.filter.toLowerCase();
    this.condiciones_shown = this.condiciones.filter(condition =>
      condition.name.toLowerCase().includes(lowerCaseFilter) ||
      condition.ico.toLowerCase().includes(lowerCaseFilter) ||
      condition.description.toLowerCase().includes(lowerCaseFilter)
    );
  }
}

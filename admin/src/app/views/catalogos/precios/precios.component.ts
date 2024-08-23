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
  FormFloatingDirective,
  FormDirective,
  FormSelectDirective,
  FormLabelDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-precios',
  standalone: true,
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss',
  providers:[CatalogService],
  imports: [ FormFloatingDirective, FormDirective, FormSelectDirective, FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink]
})
export class PreciosComponent implements OnInit {
  filter = '';
  precios: any[] = [];
  precios_shown: any[] = [];
  price_selected = { name: '' };
  public visible = false;
  is_new = false;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  get_catalog() {
    this.precios = [];
    this.price_selected = { name: '' };
    this.catalogService.get_items('precios', { name: true }).then( r => {
      this.precios = r.response;
      this.filterData();
    }).catch( e => console.log(e) );
  }

  new_item() {
    this.price_selected = { name: '' };
    this.is_new = true;
  }

  filterData() {
    const lowerCaseFilter = this.filter.toLowerCase();
    this.precios_shown = this.precios.filter(price =>
      price.name.toLowerCase().includes(lowerCaseFilter)
    );
  }

  cancelar() {
    this.visible = !this.visible;
  }

  handleChange(event: any) {
    this.visible = event;
  }

  save() {
    if (this.is_new) {
      this.upload_item([this.price_selected], 'precios');
    } else {
      this.update_item(this.price_selected, 'precios');
    }
    this.visible = !this.visible;
  }

  update_item(item: any, catalog: string) {
    this.catalogService.update_item(catalog, item.item_id, item).then(r => {
      this.get_catalog();
    }).catch( e => console.log(e) );
  }

  delete_item(item: any, catalog: string) {
    this.catalogService.delete_item(catalog, item.item_id).then(r => {
      this.get_catalog();
    }).catch( e => console.log(e) );
  }

  upload_item(item: any, catalog: string) {
    this.catalogService.upload_items(catalog, [item]).then(r => {
      this.get_catalog();
    }).catch( e => console.log(e) );
  }
}

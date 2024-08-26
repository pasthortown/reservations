import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  FormLabelDirective,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardGroupComponent,
  CardHeaderComponent,
  CardImgDirective,
  CardLinkDirective,
  CardSubtitleDirective,
  CardTextDirective,
  CardTitleDirective,
  BadgeModule
} from '@coreui/angular';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-search-header',
  standalone: true,
  providers: [CatalogService],
  imports: [ FormsModule, BadgeModule, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, CardHeaderComponent, CardImgDirective, CardLinkDirective, CardSubtitleDirective, CardTextDirective, CardTitleDirective, FormFloatingDirective, FormDirective, FormSelectDirective, ButtonGroupComponent, ButtonToolbarComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss',
})
export class SearchHeaderComponent implements OnInit {
  @Output('filter_change') filter_change: EventEmitter<any> = new EventEmitter();
  filter: any = {
    precio: '',
    zona: '',
    personas: 0,
    habitaciones: 0
  }
  precios: any[] = [];
  zonas: any[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.get_catalogs();
  }

  get_catalogs() {
    this.catalogService.get_items('zonas', {name: true} ).then( r => {
      this.zonas = r.response;
    }).catch( e => console.log(e) );
    this.catalogService.get_items('precios', {name: true} ).then( r => {
      this.precios = r.response;
    }).catch( e => console.log(e) );
  }

  filterChange(size: string) {
    if (size == 'sm') {
      this.filter.habitaciones = '0';
    }
    this.filter_change.emit(this.filter);
  }
}

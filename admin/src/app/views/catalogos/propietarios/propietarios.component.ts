import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.service';
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
import { FileDropComponent } from '../../components/file-drop/file-drop.component';
import { FilesService } from 'src/app/services/file.service';

@Component({
  selector: 'app-propietarios',
  standalone: true,
  providers:[CatalogService, FilesService],
  imports: [ FileDropComponent, FormFloatingDirective, FormDirective, FormSelectDirective, FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink],
  templateUrl: './propietarios.component.html',
  styleUrl: './propietarios.component.scss'
})
export class PropietariosComponent {
  filter = '';
  fotografias = [];
  propietarios: any[] = [];
  propietarios_shown: any[] = [];
  propietario_selected: any = { name: '', photo_id: '', description: '', photo: null };
  public visible = false;
  is_new = false;

  constructor(private catalogService: CatalogService, private filesService: FilesService) {}

  ngOnInit(): void {
    this.get_catalog();
  }

  get_catalog() {
    this.propietarios = [];
    this.propietario_selected = { name: '', photo_id: '', description: '', photo: null };
    this.catalogService.get_items('propietarios', { name: true, photo_id: true, description: true  }).then( r => {
      this.propietarios = r.response;
      this.propietarios.forEach((propietario: any) => {
        this.filesService.get_file('fotografias_propietarios', propietario.photo_id).then( r_imagenes => {
          propietario.photo = r_imagenes.response;
        }).catch( e => console.log(e) );
      });
      this.filterData();
    }).catch( e => console.log(e) );
  }

  new_item() {
    this.propietario_selected = { name: '', photo_id: '', description: '', photo: null };
    this.is_new = true;
  }

  filterData() {
    const lowerCaseFilter = this.filter.toLowerCase();
    this.propietarios_shown = this.propietarios.filter(propietario =>
      propietario.name.toLowerCase().includes(lowerCaseFilter) ||
      propietario.description.toLowerCase().includes(lowerCaseFilter)
    );
  }

  cancelar() {
    this.visible = !this.visible;
    this.get_catalog();
  }

  handleChange(event: any) {
    this.visible = event;
  }

  save() {
    let propietario_to_save: any = { name: this.propietario_selected.name, photo_id: '', description: this.propietario_selected.description }
    if (this.propietario_selected.photo_id) {
      this.filesService.delete_file('fotografias_propietarios', this.propietario_selected.photo_id);
    }
    this.fotografias.forEach((element: any) => {
      this.filesService.upload_files('fotografias_propietarios', this.fotografias).then( r_imagenes => {
        if (r_imagenes.status == 200) {
          propietario_to_save.photo_id = r_imagenes.response[0].file_id;
          if (this.is_new) {
            this.upload_item(propietario_to_save, 'propietarios');
          } else {
            propietario_to_save.item_id = this.propietario_selected.item_id;
            this.update_item(propietario_to_save, 'propietarios');
          }
        }
      }).catch( e => console.log(e) );
    });
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

  cargar_fotografia(event: any) {
    if (event.validated) {
      this.fotografias = event.files;
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceComponent } from './place.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReserveComponent } from './components/reserve/reserve.component';
import { MapModule } from './../map/map.module';
import { CatalogService } from '../../../services/catalog.service';
import { FilesService } from '../../../services/file.service';
import { FullsizeModule } from './components/fullsize/fullsize.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';

@NgModule({
  declarations: [PlaceComponent, ReserveComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MapModule,
    FullsizeModule,
    UploadFilesModule
  ],
  exports: [PlaceComponent],
  providers: [CatalogService, FilesService]
})
export class PlaceModule { }

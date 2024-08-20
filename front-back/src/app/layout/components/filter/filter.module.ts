import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../../services/catalog.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [FilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule
  ],
  exports: [FilterComponent],
  providers: [CatalogService]
})
export class FilterModule { }

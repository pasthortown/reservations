import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BodyComponent } from './components/body/body.component';
import { FilterModule } from '../components/filter/filter.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from '../../services/catalog.service';
import { FormsModule } from '@angular/forms';
import { ReportersComponent } from './components/reporters/reporters.component';
import { PlaceModule } from '../components/place/place.module';

@NgModule({
  declarations: [
    AdminComponent,
    BodyComponent,
    ReportersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    FilterModule,
    NgbModule,
    PlaceModule
  ],
  providers: [ CatalogService ]
})
export class AdminModule { }

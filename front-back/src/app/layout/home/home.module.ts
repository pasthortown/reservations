import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BodyComponent } from './components/body/body.component';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { FilterModule } from '../components/filter/filter.module';
import { PlaceModule } from '../components/place/place.module';
import { MapModule } from '../components/map/map.module';

@NgModule({
  declarations: [
    HomeComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    FilterModule,
    PlaceModule,
    MapModule
  ]
})
export class HomeModule { }

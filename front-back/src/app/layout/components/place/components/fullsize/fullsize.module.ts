import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullsizeComponent } from './fullsize.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    FullsizeComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    FullsizeComponent
  ]
})
export class FullsizeModule { }

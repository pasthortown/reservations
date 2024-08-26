import { Component, Input } from '@angular/core';
import { StarsComponent } from "../stars/stars.component";

@Component({
  selector: 'app-hero-item',
  standalone: true,
  imports: [StarsComponent],
  templateUrl: './hero-item.component.html',
})
export class HeroItemComponent {
  @Input('alojamiento') alojamiento!: any;
}

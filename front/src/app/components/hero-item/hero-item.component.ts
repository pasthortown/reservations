import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-item',
  standalone: true,
  imports: [],
  templateUrl: './hero-item.component.html',
})
export class HeroItemComponent {
  @Input('alojamiento') alojamiento!: any;

  ngOnChanges() {
    console.log(this.alojamiento);
  }
}

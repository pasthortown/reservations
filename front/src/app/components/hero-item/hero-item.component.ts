import { Component, Input } from '@angular/core';

import { HeroItem } from '../../models/models';

@Component({
  selector: 'app-hero-item',
  standalone: true,
  imports: [],
  templateUrl: './hero-item.component.html',
})
export class HeroItemComponent {
  @Input() heroItem!: HeroItem;
}

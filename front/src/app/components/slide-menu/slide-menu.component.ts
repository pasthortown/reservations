import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MenuItem } from '../../models/models';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-menu.component.html',
})
export class SlideMenuComponent {
  @Input() isShadow!: boolean;
  @Input() menuItems!: MenuItem[];
  @Input() classForMenu!: string;
}

import { Component, Input } from '@angular/core';

import { MenuItem } from '../../models/models';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SlideMenuComponent, SearchHeaderComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() isChangeSearch!: boolean;
}

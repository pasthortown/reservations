import { Component } from '@angular/core';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SlideMenuComponent, SearchHeaderComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}

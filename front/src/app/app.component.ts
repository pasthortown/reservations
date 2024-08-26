import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SlideMenuComponent,
    SearchHeaderComponent,
    HeaderComponent,
    HeroComponent,
    TabBarComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'airbnb-template';
  isTabBarVisible = true;
  isZoomOutSearchHeader = false;
  isModalMapVisible = false;

  handleScrollEvent(isVisible: boolean) {
    this.isTabBarVisible = isVisible;
  }
  handleScrollEventHead(isChange: boolean) {
    this.isZoomOutSearchHeader = isChange;
  }
}

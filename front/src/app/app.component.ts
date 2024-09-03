import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SlideMenuComponent,
    HeaderComponent,
    HeroComponent,
    TabBarComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Luxury Stays';
  isTabBarVisible = true;
  isZoomOutSearchHeader = false;
  isModalMapVisible = false;
  isModalLoginVisible = false;
  isModalProfileVisible = false;
  isModalExperienceVisible = false;

  filter: any = {
    precio: '',
    zona: '',
    personas: 0,
    habitaciones: 0
  }

  handleScrollEvent(isVisible: boolean) {
    this.isTabBarVisible = isVisible;
  }

  handleScrollEventHead(isChange: boolean) {
    this.isZoomOutSearchHeader = isChange;
  }

  filterChange(event: any) {
    this.filter = event;
  }
}

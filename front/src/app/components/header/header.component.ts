import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SlideMenuComponent, SearchHeaderComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output('filter_change') filter_change: EventEmitter<any> = new EventEmitter();
  @Output('open_login_modal') open_login_modal: EventEmitter<any> = new EventEmitter();
  @Output('open_profile_modal') open_profile_modal: EventEmitter<any> = new EventEmitter();

  user: any = null;

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling() {
    setInterval(() => {
      this.updateUser();
    }, 1000);
  }

  updateUser() {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user') as string);
    } catch (error) {
      this.user = null;
    }
  }

  filterChange(event: any) {
    this.filter_change.emit(event);
  }

  toggle_profile_modal() {
    this.open_profile_modal.emit(true);
  }

  toggle_login_modal() {
    this.open_login_modal.emit(true);
  }
}

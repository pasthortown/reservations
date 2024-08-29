import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FooterComponent } from './../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './tab-bar.component.html',
})
export class TabBarComponent implements OnInit{
  @Input() isVisible = true;
  @Output('browse_on_map') browse_on_map: EventEmitter<any> = new EventEmitter();
  @Output('open_login_modal') open_login_modal: EventEmitter<any> = new EventEmitter();

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

  toggle_map_modal() {
    this.browse_on_map.emit(true);
  }

  toggle_login_modal() {
    this.open_login_modal.emit(true);
  }

  logout() {
    Swal.fire({
      title: 'Cerrar Sesión!',
      text: 'Esta seguro que desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo cerrar sesión!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
      }
    });
  }
}

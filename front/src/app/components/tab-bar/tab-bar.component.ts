import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterComponent } from './../footer/footer.component';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './tab-bar.component.html',
})
export class TabBarComponent {
  @Input() isVisible = true;
  @Output('browse_on_map') browse_on_map: EventEmitter<any> = new EventEmitter();

  toggle_map_modal() {
    this.browse_on_map.emit(true);
  }
}

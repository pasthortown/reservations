import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [],
  templateUrl: './tab-bar.component.html',
})
export class TabBarComponent {
  @Input() isVisible = true;
}

import { Component, Input } from '@angular/core';
import { ThemeDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [ThemeDirective, IconDirective],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent {

  @Input('rate') rate: number = 0;
}

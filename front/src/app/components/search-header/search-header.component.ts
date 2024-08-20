import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [],
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent {
  @Input() isChangeSearch!: boolean;
}

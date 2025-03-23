import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SubmenuComponent } from '@core/components/submenu/submenu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SubmenuComponent
  ],
  host: {
    '[class.test]': 'true'
  }
})
export class MenuComponent {

  public readonly menuItems = input.required<MenuItem[]>();
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SubmenuComponent } from '@core/components/submenu/submenu.component';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SubmenuComponent
  ]
})
export class MenuComponent {

  @Input()
  public menuItems: MenuItem[];
}

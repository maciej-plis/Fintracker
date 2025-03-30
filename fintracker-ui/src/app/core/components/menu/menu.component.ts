import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SubmenuComponent } from '@core/components/submenu/submenu.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SubmenuComponent
  ]
})
export class MenuComponent {

  public readonly menuItems = input.required<MenuItem[]>();
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuComponent } from '@core/components/menu/menu.component';
import { RouterLink } from '@angular/router';
import { LayoutService } from '@core/services/layout/layout.service';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: '[app-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenuComponent,
    RouterLink,
    SvgIconComponent
  ]
})
export class SidebarComponent {

  private readonly layoutService = inject(LayoutService);

  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Expenses',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          routerLink: [ '/expenses/dashboard' ]
        },
        {
          label: 'Purchases',
          icon: 'pi pi-fw pi-shopping-cart',
          routerLink: [ '/expenses/purchases' ]
        }
      ]
    }
  ];

  private timeout: any = null;

  protected onMouseEnter() {
    if (this.layoutService.layoutState().anchored) return;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.layoutService.layoutState.update((state) => {
      return !state.sidebarActive ? { ...state, sidebarActive: true } : state;
    });
  }

  protected onMouseLeave() {
    if (this.layoutService.layoutState().anchored || this.timeout) return;
    this.timeout = setTimeout(() => {
      this.layoutService.layoutState.update((state) =>
        state.sidebarActive ? { ...state, sidebarActive: false } : state
      );
    }, 300);
  }

  protected anchor() {
    this.layoutService.layoutState.update((state) => ({ ...state, anchored: !state.anchored }));
  }
}

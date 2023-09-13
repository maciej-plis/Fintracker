import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '@core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuComponent {

  private readonly sidebarService = inject(SidebarService);

  private readonly MENU_ITEM_OPEN_CLASS = 'submenu__item--open';

  @Input()
  public menuItems: MenuItem[];

  public activate(menuItem: MenuItem, menuItemEl: HTMLElement) {
    const open = !menuItemEl.classList.contains(this.MENU_ITEM_OPEN_CLASS);
    this.closeAllOpenMenuItems();
    this.openMenuItemsUpToRoot(menuItemEl);

    if (menuItem.items) {
      menuItemEl.classList.toggle(this.MENU_ITEM_OPEN_CLASS, open);
    }

    if (menuItem.routerLink) {
      this.sidebarService.hideSidebar();
    }
  }

  private closeAllOpenMenuItems() {
    document.querySelectorAll(`.${ this.MENU_ITEM_OPEN_CLASS }`)
      .forEach(menuItem => menuItem.classList.remove(this.MENU_ITEM_OPEN_CLASS));
  }

  private openMenuItemsUpToRoot(menuItemEl: HTMLElement) {
    let tempMenuItemEl: HTMLElement | undefined | null = menuItemEl;
    while (tempMenuItemEl) {
      tempMenuItemEl = tempMenuItemEl.parentElement?.closest(`.submenu__item`);
      tempMenuItemEl?.classList?.add(this.MENU_ITEM_OPEN_CLASS);
    }
  }
}

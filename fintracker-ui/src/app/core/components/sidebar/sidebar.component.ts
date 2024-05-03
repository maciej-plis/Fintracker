import { ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from '@core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  private nativeElement = inject(ElementRef).nativeElement;
  private sidebarService = inject(SidebarService);

  public isOpen = this.sidebarService.sidebarVisible;
  public menuItems: MenuItem[] = [
    {
      label: 'Expenses',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/expenses/dashboard'
        },
        {
          label: 'Purchases',
          icon: 'pi pi-shopping-cart',
          routerLink: '/expenses/purchases'
        }
      ]
    }
  ];

  public constructor() {
    // Move focus to before sidebar
    effect(() => this.isOpen() && (document.querySelector('.root-container') as HTMLElement)?.focus());
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick({target}: Event) {
    if (this.isOpen() && !this.nativeElement.contains(target)) {
      this.sidebarService.hideSidebar();
    }
  }
}

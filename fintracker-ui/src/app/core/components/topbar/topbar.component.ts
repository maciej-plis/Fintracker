import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '@core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {

  private readonly sidebarService = inject(SidebarService);

  public showSideBar(event: Event) {
    event.stopPropagation();
    this.sidebarService.showSidebar();
  }
}

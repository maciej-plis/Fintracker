import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '@core/services/sidebar/sidebar.service';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from '@core/components/breadcrumb/breadcrumb.component';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    BreadcrumbComponent
  ]
})
export class TopbarComponent {

  private readonly sidebarService = inject(SidebarService);

  public showSideBar(event: Event) {
    event.stopPropagation();
    this.sidebarService.showSidebar();
  }
}

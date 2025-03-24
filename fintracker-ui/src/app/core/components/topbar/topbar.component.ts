import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '@core/components/breadcrumb/breadcrumb.component';
import { LayoutService } from '@core/services/layout/layout.service';

@Component({
  selector: '[app-topbar]',
  templateUrl: 'topbar.component.html',
  styleUrl: 'topbar.component.scss',
  imports: [
    BreadcrumbComponent
  ]
})
export class TopbarComponent {

  private readonly layoutService = inject(LayoutService);

  protected onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }
}

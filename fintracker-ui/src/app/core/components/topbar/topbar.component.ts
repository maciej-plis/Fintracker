import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { BreadcrumbComponent } from '@core/components/breadcrumb/breadcrumb.component';
import { LayoutService } from '@core/services/layout/layout.service';

@Component({
  selector: '[app-topbar]',
  templateUrl: 'topbar.component.html',
  styleUrl: 'topbar.component.scss',
  imports: [ RouterModule, CommonModule, StyleClassModule, InputTextModule, ButtonModule, IconFieldModule, InputIconModule, BreadcrumbComponent ]
})
export class TopbarComponent {

  private readonly layoutService = inject(LayoutService);

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }
}

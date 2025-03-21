import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarComponent, TopbarComponent } from '@core/components';
import { RouterOutlet } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import 'ag-grid-enterprise';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    ToastModule,
    ConfirmDialogModule,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {

  public ngOnInit() {
    registerLocaleData(localePl, 'pl-PL', localePlExtra);
  }
}

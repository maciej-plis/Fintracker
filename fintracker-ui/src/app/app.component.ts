import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';
import 'ag-grid-enterprise';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { LayoutComponent } from '@core/components/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    ToastModule,
    ConfirmDialogModule,
    LayoutComponent
  ]
})
export class AppComponent implements OnInit {

  public ngOnInit() {
    registerLocaleData(localePl, 'pl-PL', localePlExtra);
  }
}

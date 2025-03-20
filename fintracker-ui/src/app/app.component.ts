import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarComponent, TopbarComponent } from '@core/components';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import { provideSvgSprites } from 'ngxtension/svg-sprite';
import { ripple, svgSprites } from 'src/app/app.constants';
import { AutoComplete } from 'primeng/autocomplete';
import 'ag-grid-enterprise';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';

@Component({
  standalone: true,
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
export class AppComponent {

  private primeNgConfig = inject(PrimeNGConfig);

  constructor() {
    registerLocaleData(localePl, 'pl-PL', localePlExtra);
    provideSvgSprites(...svgSprites);
    this.primeNgConfig.ripple = ripple;
    this.configureAutocompleteTabBehaviour();
  }

  private configureAutocompleteTabBehaviour() {
    const origOnKeydown = AutoComplete.prototype.onKeyDown;
    AutoComplete.prototype.onKeyDown = function (event: KeyboardEvent) {
      if (event.key === 'Tab') {
        if (this.focusedOptionIndex() !== -1) {
          this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()], false);
        }
        this.hide();
        return;
      }
      origOnKeydown.apply(this, [event]);
    };
  }
}

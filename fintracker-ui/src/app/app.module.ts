import 'ag-grid-enterprise';
import { inject, NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ApiModule, Configuration } from '@core/api';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { provideSvgSprites } from 'ngxtension/svg-sprite';
import { DialogService } from 'primeng/dynamicdialog';
import { ripple, svgSprites } from 'src/app/app.constants';
import { AutoComplete } from 'primeng/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { SidebarComponent, TopbarComponent } from '@core/components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    SidebarComponent,
    TopbarComponent,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    ApiModule.forRoot(() => new Configuration({basePath: '', withCredentials: true})),
    MenuModule,
    ToolbarModule,
    ButtonModule
  ],
  providers: [
    provideNgxErrorsConfig({showErrorsWhenInput: 'dirty', showMaxErrors: 1}),
    ConfirmationService,
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

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

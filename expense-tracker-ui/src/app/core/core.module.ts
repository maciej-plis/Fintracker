import { inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from '@core/guards/ensure-module-loaded-once.guard';
import { SidebarComponent, TopbarComponent } from '@core/components';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { LogoComponent } from './components/logo/logo.component';
import { LogoSmallComponent } from './components/logo-small/logo-small.component';
import { MenuModule } from 'primeng/menu';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@shared/shared.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ApiModule, Configuration } from '@core/api';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { provideSvgSprites } from 'ngxtension/svg-sprite';
import { DialogService } from 'primeng/dynamicdialog';
import { ripple } from 'src/app/app.constants';
import { AutoComplete } from 'primeng/autocomplete';

const sprites = [
  {name: 'pin', baseUrl: 'assets/svg/pin.svg'}
];

@NgModule({
  declarations: [
    SidebarComponent,
    MenuComponent,
    LogoComponent,
    LogoSmallComponent,
    SubmenuComponent,
    TopbarComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    ApiModule.forRoot(() => new Configuration({basePath: '', withCredentials: true})),
    SharedModule,
    MenuModule,
    RippleModule,
    ToolbarModule,
    ButtonModule
  ],
  exports: [
    SidebarComponent,
    TopbarComponent
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  private primeNgConfig = inject(PrimeNGConfig);

  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    super(coreModule);
    registerLocaleData(localePl, 'pl-PL', localePlExtra);
    provideSvgSprites(...sprites);
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

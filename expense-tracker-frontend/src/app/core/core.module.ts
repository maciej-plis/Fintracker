import {NgModule, Optional, SkipSelf} from '@angular/core';
import {EnsureModuleLoadedOnceGuard} from "@core/guards/ensure-module-loaded-once.guard";
import {HeaderComponent, SidenavComponent} from "@core/components";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApiModule, Configuration} from 'build/expense-tracker-frontend-api';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    ApiModule.forRoot(() => new Configuration({basePath: '', withCredentials: true})),
  ],
  exports: [
    HeaderComponent,
    SidenavComponent
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    super(coreModule)
  }
}

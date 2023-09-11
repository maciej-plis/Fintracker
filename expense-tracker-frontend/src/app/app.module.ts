import '@angular/common/locales/global/pl'

import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "@core/core.module";
import {DashboardComponent} from "./purchases/views";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "pl-PL"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

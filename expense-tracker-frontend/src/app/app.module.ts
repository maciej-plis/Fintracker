import '@angular/common/locales/global/pl'

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Configuration } from 'build/expense-tracker-frontend-api';
import { environment } from "@environments/environment";
import { CoreModule } from "@core/core.module";
import { DashboardComponent } from "./purchases/views";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent

  ],
  imports: [
    AppRoutingModule,
    CoreModule
  ],
  providers: [{ provide: Configuration, useValue: environment.apiConfiguration }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import 'ag-grid-enterprise';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    provideNgxErrorsConfig({showErrorsWhenInput: 'dirty', showMaxErrors: 1})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

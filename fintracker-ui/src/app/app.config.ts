import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from 'src/app/app.routes';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withXsrfConfiguration({cookieName: 'XSRF-TOKEN'})),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNgxErrorsConfig({showErrorsWhenInput: 'dirty', showMaxErrors: 1}),
    ConfirmationService,
    MessageService,
    DialogService
  ]
};

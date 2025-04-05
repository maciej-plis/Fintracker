import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from 'src/app/app.routes';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideAngularSvgIcon } from 'angular-svg-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withXsrfConfiguration({ cookieName: 'XSRF-TOKEN' })),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideNgxErrorsConfig({ showErrorsWhenInput: 'dirty', showMaxErrors: 1 }),
    provideAngularSvgIcon(),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    }),
    ConfirmationService,
    MessageService,
    DialogService
  ]
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxErrorsConfig } from '@ngspot/ngx-errors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from 'src/app/app.routes';
import { provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideSvgSprites } from 'ngxtension/svg-sprite';
import { svgSprites } from 'src/app/app.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withXsrfConfiguration({ cookieName: 'XSRF-TOKEN' })),
    provideRouter(routes),
    provideNgxErrorsConfig({ showErrorsWhenInput: 'dirty', showMaxErrors: 1 }),
    provideSvgSprites(...svgSprites),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }),
    ConfirmationService,
    MessageService,
    DialogService
  ]
};

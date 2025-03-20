import { AppComponent } from './app';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from 'src/app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

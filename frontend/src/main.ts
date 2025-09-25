import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
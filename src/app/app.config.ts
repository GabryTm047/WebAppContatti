import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { TestDIInterceptor, testInterceptor } from './interceptors/test.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(), //metodo vecchio che prende tutti gli interceptor injectable
      withInterceptors([testInterceptor]) //ci sono delle function e bisogna specificarle
    ),
    {provide: HTTP_INTERCEPTORS, useClass: TestDIInterceptor, multi: true}
  ]
};

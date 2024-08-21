import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-fa34d',
        appId: '1:432564095023:web:5f4afd9691c974ae819eda',
        storageBucket: 'simple-crm-fa34d.appspot.com',
        apiKey: 'AIzaSyDsKQ9SbaY6q2UU5oyGaX_qRgFo6gGycRw',
        authDomain: 'simple-crm-fa34d.firebaseapp.com',
        messagingSenderId: '432564095023',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};

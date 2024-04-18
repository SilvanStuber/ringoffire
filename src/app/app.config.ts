import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-69da4","appId":"1:616317934252:web:36dfc6fcf310d6e3b61d09","storageBucket":"ring-of-fire-69da4.appspot.com","apiKey":"AIzaSyC6oeTUjE7mpY9Rl07aLg6pi1AcLiRP3hc","authDomain":"ring-of-fire-69da4.firebaseapp.com","messagingSenderId":"616317934252"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};

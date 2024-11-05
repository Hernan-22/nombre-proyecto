import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./contact-list/contact-list.component')
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./contact-form/contact-form.component')
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component')
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./contact-form/contact-form.component')
  },
];

import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './core/layout/public/public-layout/public-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/public/home-component/home-component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/pages/public/about-us-component/about-us-component').then(
            (m) => m.AboutUsComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/pages/public/contact-us-component/contact-us-component').then(
            (m) => m.ContactUsComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/public/product-list/product-list').then((m) => m.ProductList),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/pages/public/login-component/login-component').then(
            (m) => m.LoginComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/private/private-layout/private-layout').then((m) => m.PrivateLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/pages/private/dashboard-component/dashboard-component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/private/products/private-product-list/private-product-list').then(
            (m) => m.PrivateProductList,
          ),
      },
      {
        path: 'carts',
        loadComponent: () =>
          import('./features/pages/private/carts/private-cart-list/private-cart-list').then(
            (m) => m.PrivateCartList,
          ),
      },
      {
        path: 'carts/:id',
        loadComponent: () =>
          import('./features/pages/private/carts/cart-detail/cart-detail').then(
            (m) => m.CartDetail,
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

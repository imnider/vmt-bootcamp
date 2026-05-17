import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () =>
            import('./features/routes/home.route').then(m => m.homeRoute)
    },
    {
        path: 'authors',
        loadChildren: () =>
            import('./features/routes/author.route').then(m => m.authorRoute)
    },
    {
        path: 'books',
        loadComponent: () => import('./features/pages/books/book-list/book-list').then(m => m.BookList)
    }
    ,
    { path: '**', redirectTo: 'home' }
];

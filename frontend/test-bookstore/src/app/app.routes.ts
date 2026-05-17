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
        loadChildren: () =>
            import('./features/routes/book.route').then(m => m.booksRoute)
    }
    ,
    { path: '**', redirectTo: 'home' }
];

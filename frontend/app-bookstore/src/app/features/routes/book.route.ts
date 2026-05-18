import { Routes } from "@angular/router";
import { BookComponent } from "../pages/books/book-list/book-list";
import { BookDetail } from "../pages/books/book-detail/book-details";

export const booksRoute: Routes = [
    {path: '', component: BookComponent},
    {path: ':id', component: BookDetail}
];
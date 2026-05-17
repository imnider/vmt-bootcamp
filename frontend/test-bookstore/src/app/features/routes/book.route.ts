import { Routes } from "@angular/router";
import { BookList } from "../pages/books/book-list/book-list";
import { BookDetails } from "../pages/books/book-details/book-details";

export const booksRoute: Routes = [
    {path: '', component: BookList},
    {path: ':id', component: BookDetails}
];
import { Routes } from "@angular/router";
import { BookComponent } from "../pages/books/book-component/book-component";
import { BookDetail } from "../pages/books/bookdetails-component/bookdetails-component";

export const booksRoute: Routes = [
    {path: '', component: BookComponent},
    {path: ':id', component: BookDetail}
];
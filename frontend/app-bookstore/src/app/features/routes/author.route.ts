import { Routes } from "@angular/router";
import { Authors } from "../pages/authors/author-list/author-list";
import { AuthorDetail } from "../pages/authors/author-detail/author-detail";

export const authorRoute: Routes = [
    {path: '', component: Authors},
    {path: ':id', component: AuthorDetail}
];
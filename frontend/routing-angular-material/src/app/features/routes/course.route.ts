import { Routes } from "@angular/router";
import { CourseListComponent } from "../pages/courses/course-list-component/course-list-component";
import { CourseDetailComponent } from "../pages/courses/course-detail-component/course-detail-component";

export const coursesRoutes: Routes = [
    {path: '', component: CourseListComponent},
    {path: ':id', component: CourseDetailComponent}
];
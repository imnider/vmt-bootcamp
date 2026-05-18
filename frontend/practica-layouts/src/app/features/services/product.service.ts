import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProduct } from "../interfaces/product.interface";

@Injectable({providedIn: 'root'})
export class ProductService {
    private readonly http = inject(HttpClient)
    private readonly apiURL = `${environment.apiURL}/products`;
    
    getAll(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(`${this.apiURL}`);
    }

    getById(id: string): Observable<IProduct> {
        return this.http.get<IProduct>(`${this.apiURL}/${id}`);
    }
}
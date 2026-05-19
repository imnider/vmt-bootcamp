import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { IProduct } from "../interfaces/product.interface";
import { GenericService } from "../../core/services/generic.service";

@Injectable({providedIn: 'root'})
export class ProductService extends GenericService<IProduct> {
    constructor() {
        super(`${environment.apiURL}/products`);
    }
}
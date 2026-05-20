import { Injectable } from "@angular/core";
import { GenericService } from "../../core/services/generic.service";
import { environment } from "../../../environment/environment";
import { Product } from "../interfaces/public/product.interface";

@Injectable({ providedIn: 'root' })
export class ProductService extends GenericService<Product> {
    constructor() {
        super(`${environment.apiUrl}/products`);
    }
}
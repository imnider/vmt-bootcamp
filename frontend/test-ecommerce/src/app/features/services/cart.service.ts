import { Injectable } from '@angular/core';
import { GenericService } from '../../core/services/generic.service';
import { environment } from '../../../environment/environment';
import { Cart } from '../interfaces/private/cart.interface';

@Injectable({ providedIn: 'root' })
export class CartService extends GenericService<Cart> {
  constructor() {
    super(`${environment.apiUrl}/carts`);
  }
}

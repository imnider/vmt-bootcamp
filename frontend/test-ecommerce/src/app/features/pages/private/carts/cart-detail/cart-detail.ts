import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { Cart } from '../../../../interfaces/private/cart.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-detail',
  imports: [MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './cart-detail.html',
  styleUrl: './cart-detail.scss',
})
export class CartDetail {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private cartService = inject(CartService);

  cart = signal<Cart | null>(null);

  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCart(id);
  }

  loadCart(id: number) {
    this.loading.set(true);

    this.cartService.getById(id.toString()).subscribe({
      next: (cart) => {
        this.cart.set(cart);
        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/carts']);
  }
}

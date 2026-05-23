import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { Cart } from '../../../../interfaces/private/cart.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../../interfaces/public/product.interface';
import { CartProductForm } from '../cart-product-form/cart-product-form';
import { CartForm } from '../cart-form/cart-form';
import { CartConfirm } from '../cart-confirm/cart-confirm';

@Component({
  selector: 'app-private-cart-list',
  imports: [MatIconModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './private-cart-list.html',
  styleUrl: './private-cart-list.scss',
})
export class PrivateCartList {
  private cartService = inject(CartService);

  private snackBar = inject(MatSnackBar);

  private router = inject(Router);

  private dialog = inject(MatDialog);

  carts = signal<Cart[]>([]);

  loading = signal(false);

  ngOnInit() {
    this.loadCarts();
  }

  loadCarts() {
    this.loading.set(true);

    this.cartService.getAll().subscribe({
      next: (data: any) => {
        this.carts.set(data.carts);

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);

        this.snackBar.open('Error al cargar los carritos.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  createCart() {
    this.snackBar.open('Aquí irá la creación del carrito.', 'Cerrar', {
      duration: 3000,
    });
  }

  addProduct(cart: Cart, productId: number) {
    this.carts.update((carts) =>
      carts.map((c) => {
        if (c.id !== cart.id) return c;

        const updatedProducts = c.products.map((product) => {
          if (product.id !== productId) return product;

          return {
            ...product,
            quantity: product.quantity + 1,
            total: (product.quantity + 1) * product.price,
          };
        });

        const totalQuantity = updatedProducts.reduce((acc, product) => acc + product.quantity, 0);

        const total = updatedProducts.reduce((acc, product) => acc + product.total, 0);

        const discountedTotal = updatedProducts.reduce(
          (acc, product) => acc + product.total * (1 - product.discountPercentage / 100),
          0,
        );

        return {
          ...c,
          products: updatedProducts,
          totalQuantity,
          totalProducts: updatedProducts.length,
          total,
          discountedTotal,
        };
      }),
    );

    this.snackBar.open('Cantidad aumentada.', 'Cerrar', {
      duration: 2000,
    });
  }

  removeProduct(cart: Cart, productId: number) {
    this.carts.update((carts) =>
      carts.map((c) => {
        if (c.id !== cart.id) return c;

        let updatedProducts = c.products.map((product) => {
          if (product.id !== productId) return product;

          return {
            ...product,
            quantity: product.quantity - 1,
            total: (product.quantity - 1) * product.price,
          };
        });

        updatedProducts = updatedProducts.filter((product) => product.quantity > 0);

        const totalQuantity = updatedProducts.reduce((acc, product) => acc + product.quantity, 0);

        const total = updatedProducts.reduce((acc, product) => acc + product.total, 0);

        const discountedTotal = updatedProducts.reduce(
          (acc, product) => acc + product.total * (1 - product.discountPercentage / 100),
          0,
        );

        return {
          ...c,
          products: updatedProducts,
          totalQuantity,
          totalProducts: updatedProducts.length,
          total,
          discountedTotal,
        };
      }),
    );

    this.snackBar.open('Cantidad reducida.', 'Cerrar', {
      duration: 2000,
    });
  }

  openDetail(cart: Cart) {
    this.router.navigate(['/admin/carts', cart.id]);
  }

  deleteCart(cart: Cart) {
    const dialogRef = this.dialog.open(CartConfirm, {
      width: '400px',
      panelClass: 'danger-dialog',
      data: cart,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.carts.update((carts) => carts.filter((c) => c.id !== cart.id));

      this.snackBar.open('Carrito eliminado.', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  openAddProduct(cart: Cart) {
    const dialogRef = this.dialog.open(CartProductForm, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const selectedProduct = result.product;
      const quantity = result.quantity;

      const existingProduct = cart.products.find((p) => p.id === selectedProduct.id);

      if (existingProduct) {
        this.addProduct(cart, selectedProduct.id);
        return;
      }

      const newProduct = {
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        quantity,
        total: selectedProduct.price * quantity,
        discountPercentage: selectedProduct.discountPercentage,
      };

      this.carts.update((carts) =>
        carts.map((c) => {
          if (c.id !== cart.id) return c;

          const updatedProducts = [...c.products, newProduct];

          const totalQuantity = updatedProducts.reduce((acc, product) => acc + product.quantity, 0);

          const total = updatedProducts.reduce((acc, product) => acc + product.total, 0);

          const discountedTotal = updatedProducts.reduce(
            (acc, product) => acc + product.total * (1 - product.discountPercentage / 100),
            0,
          );

          return {
            ...c,
            products: updatedProducts,
            totalProducts: updatedProducts.length,
            totalQuantity,
            total,
            discountedTotal,
          };
        }),
      );

      this.snackBar.open('Producto agregado al carrito.', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  openCreateCart() {
    const dialogRef = this.dialog.open(CartForm, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const newCart = {
        id: Date.now(),

        userId: result.userId,

        total: 0,

        discountedTotal: 0,

        totalQuantity: 0,

        totalProducts: 0,

        products: [],
      };

      this.carts.update((carts) => [newCart, ...carts]);

      this.snackBar.open('Carrito creado correctamente.', 'Cerrar', {
        duration: 3000,
      });
    });
  }
}

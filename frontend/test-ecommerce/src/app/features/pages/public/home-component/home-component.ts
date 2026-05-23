import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../interfaces/public/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [MatCardModule, RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  featuredProducts: Product[] = [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/seed/laptop-gamer/600/600',
      sku: 'LAP-001',
      title: 'Laptop Gamer',
      description: 'Alto rendimiento para gaming y trabajo.',
      rating: 4.8,
      stock: 12,
      images: [],
      brand: 'NovaTech',
      category: 'Tecnología',
      discountPercentage: 15,
      price: 1200,
    },

    {
      id: 2,
      thumbnail: 'https://picsum.photos/seed/headphones-wireless/600/600',
      sku: 'AUD-002',
      title: 'Audífonos Inalámbricos',
      description: 'Sonido envolvente y batería duradera.',
      rating: 4.6,
      stock: 20,
      images: [],
      brand: 'NovaSound',
      category: 'Audio',
      discountPercentage: 10,
      price: 180,
    },

    {
      id: 3,
      thumbnail: 'https://picsum.photos/seed/smartwatch-modern/600/600',
      sku: 'SWT-003',
      title: 'Smartwatch',
      description: 'Monitoreo inteligente y elegante diseño.',
      rating: 4.7,
      stock: 18,
      images: [],
      brand: 'NovaFit',
      category: 'Wearables',
      discountPercentage: 12,
      price: 250,
    },
  ];
}

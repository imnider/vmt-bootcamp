import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../interfaces/public/product.interface';

@Component({
  selector: 'app-home-component',
  imports: [MatCardModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  featuredProducts: Product[] = [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/seed/product1/300/300',
      sku: 'LFNPNTVB',
      title: 'Elegant Marble Ball',
      description: 'The Josh Chair is the latest in a series of sarcastic products from Rosenbaum, Morissette and Herzog',
      rating: 2.4,
      stock: 260,
      images: [
        'https://picsum.photos/seed/product1a/600/600',
        'https://picsum.photos/seed/product1b/600/600'
      ],
      brand: 'Auer - Collins',
      category: 'laptops',
      discountPercentage: 19.8,
      price: 1313.1
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/seed/product2/300/300',
      sku: 'XHGTY123',
      title: 'Modern Laptop Pro',
      description: 'High performance laptop designed for productivity and gaming.',
      rating: 4.8,
      stock: 45,
      images: [
        'https://picsum.photos/seed/product2a/600/600'
      ],
      brand: 'TechNova',
      category: 'laptops',
      discountPercentage: 15,
      price: 1999.99
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/seed/product3/300/300',
      sku: 'ABCD1234',
      title: 'Wireless Headphones',
      description: 'Noise cancelling wireless headphones with premium sound.',
      rating: 4.5,
      stock: 120,
      images: [
        'https://picsum.photos/seed/product3a/600/600'
      ],
      brand: 'SoundMax',
      category: 'audio',
      discountPercentage: 10,
      price: 249.99
    }
  ];
}

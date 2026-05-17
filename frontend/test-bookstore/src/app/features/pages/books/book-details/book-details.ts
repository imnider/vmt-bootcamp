import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IBook } from '../../../interfaces/IBook';
import { BooksService } from '../../../services/books-service/books-service';

@Component({
  selector: 'app-book-details',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
})
export class BookDetails {
  books = signal<IBook[]>([]);
  errorMessage = signal('');
  loading = signal(false);

  constructor(private bookService: BooksService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.bookService.getBookById(id!).subscribe({
        next: (data) => this.books.set([data]),
        error: () => this.errorMessage.set('Error al caragar el libro')
      });
    }
}

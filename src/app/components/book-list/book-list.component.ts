import { Component, OnInit } from '@angular/core';
import { BookDataService } from '../book-data.service';
import { BookListItem } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books$: Observable<BookListItem[]>;
  constructor(private service: BookDataService) { }

  ngOnInit() {
    this.books$ = this.service.getBooks();
  }

}

import { Component, OnInit } from '@angular/core';
import { BooksService } from './../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private book: BooksService) { }

  editMode = false;
  booksData: any = [];
  public modal = false;

  ngOnInit(): void {
    this.book.getAllBooks().subscribe((allBooksData)=> {
      console.log(allBooksData)
      this.booksData = allBooksData;
    });
    
  }


  deleteBooks(dataItem:any){

  }

  editBooks(dataItem:any){

  }
}

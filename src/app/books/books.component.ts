import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor() { }

  editMode = false;
  booksData: any = [];
  public modal = false;

  ngOnInit(): void {
  }

  deleteBooks(dataItem:any){

  }

  editBooks(dataItem:any){

  }
}

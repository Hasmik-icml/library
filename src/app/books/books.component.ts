import { Component, OnInit } from '@angular/core';
import { BooksService } from './../books.service';
import { FormGroup, FormControl } from '@angular/forms';


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

  addBookData = new FormGroup({
    booksName: new FormControl(''),
    date: new FormControl(''),
  });

  ngOnInit(): void {
    this.book.getAllBooks().subscribe((allBooksData)=> {
      console.log(allBooksData)
      this.booksData = allBooksData;
    });
    
    
  }


  deleteBooks(dataItem:any){
    this.book.deleteBooks(dataItem).subscribe();
    this.ngOnInit();

  }

  editBooks(dataItem:any){
    console.log('խմբագրելուց-', dataItem);

    this.modal = true;
    this.editMode = true;
    this.addBookData = new FormGroup({
      booksName: new FormControl(dataItem),
      date: new FormControl(dataItem),
    });
  }
  }


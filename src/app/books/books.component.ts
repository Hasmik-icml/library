import { Component, OnInit } from '@angular/core';
import { BooksService } from './../books.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public opened = false;
  dataItem = "";
  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    if(status == 'yes') {
      this.deleteBooks(this.dataItem);
    }
    this.opened = false;
    this.ngOnInit();
  }

  public open(dataItem:any): void {
    this.dataItem = dataItem;
    this.opened = true;
  }

  constructor(private book: BooksService) { }

  editMode = false;
  booksData: any = [];
  public modal = false;

  addBooksData = new FormGroup({
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
    this.addBooksData = new FormGroup({
      booksName: new FormControl(dataItem.booksName),
      booksDate: new FormControl(dataItem.booksDate),
      genreName: new FormControl(dataItem.genreName.genreName),
      authorName: new FormControl(dataItem.authorName.authorName)
  });
  }
  }


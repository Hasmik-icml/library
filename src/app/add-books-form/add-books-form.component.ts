import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BooksService } from './../books.service';

@Component({
  selector: 'app-add-books-form',
  templateUrl: './add-books-form.component.html',
  styleUrls: ['./add-books-form.component.css']
})
export class AddBooksFormComponent implements OnInit {

  modalTitle = "ADD NEW BOOK";
  editId = 0;
  @Output() close = new EventEmitter<void>(); 

  constructor(private book: BooksService) { }

  addBooksData = new FormGroup({
    bookName: new FormControl(''),
    bookDate: new FormControl('')
});

  ngOnInit(): void {
  }

  SaveData(status:boolean){

  }
}

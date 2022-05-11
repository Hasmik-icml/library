import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from './../books.service';
import { GenreService } from './../genre.service';
import { AuthorService } from './../author.service';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-add-books-form',
  templateUrl: './add-books-form.component.html',
  styleUrls: ['./add-books-form.component.css']
})
export class AddBooksFormComponent implements OnInit {
  modalTitle = "ADD NEW BOOK";
  editId = 0;
  genreList: any = [];
  authorList: any = [];
  authorResultList: any = [];
  value=[];

  public isDisabledAuthors = true;
  public defaultItemGenres = {
    genreName: 'Select genre',
    genreId: null,
  };

  public defaultItemAuthors = {
    authorName: 'Select author',
    authorId: null ,
  };


  public selectedGenre = undefined;
  public selectedAuthor = undefined;

  
  public addBooksData : FormGroup =new FormGroup({
    bookName: new FormControl('',[Validators.required]),
    bookDate: new FormControl('',[Validators.required]),
    genreName: new FormControl('',[Validators.required]),
    authorName: new FormControl('',[Validators.required])
});


  handleGenreChange(value:any) {
    console.log("value=", value);
    console.log("authorList=", this.authorList);


    if (value === undefined) {
      this.isDisabledAuthors = true;
      // this.authorList = [];
    } else {
      this.isDisabledAuthors = false;
      this.authorResultList = this.authorList.filter((s:any) => {
            return s.genreList.some((item:any)=>{
            return  item.genreName === value.genreName
          })
    });
    }
    this.addBooksData.get('genreName')?.patchValue(value);
    console.log("genre=",this.addBooksData.get('genreName')?.value)
    
    this.addBooksData = new FormGroup({
      bookName: new FormControl(this.addBooksData.value.bookName),
      bookDate: new FormControl(this.addBooksData.value.bookDate),
      genreName: new FormControl(this.addBooksData.value.genreName),
      authorName: new FormControl(this.addBooksData.value.authorName)
  });
  console.log(this.addBooksData.value);
  
  }

  handleAuthorChange(value:any) {
    this.addBooksData.get('authorName')?.patchValue(value);
    console.log("authorName=",this.addBooksData.get('authorName')?.value)
}


  @Output() close = new EventEmitter<void>(); 

  constructor(private book: BooksService,
               private genre: GenreService, 
               private author: AuthorService,
               private bookC: BooksComponent) {}

  ngOnInit(): void {
    this.genre.getAllGenre().subscribe((allGenreData)=>{
      console.log(allGenreData);
      this.genreList = allGenreData;
    })

    this.author.getAllAuthor().subscribe((allAuthorsData)=>{
      console.log(allAuthorsData);
      this.authorList = allAuthorsData;
    })
  }

  SaveData(event:any,status:boolean){
    // this.addBooksData.get('authorName')?.patchValue(event.target.value);
    // console.log("author",this.addBooksData.get('authorName')?.value)
    this.addBooksData = new FormGroup({
      bookName: new FormControl(this.addBooksData.value.bookName),
      bookDate: new FormControl(this.addBooksData.value.bookDate),
      genreName: new FormControl(this.addBooksData.value.genreName),
      authorName: new FormControl(this.addBooksData.value.authorName)
  });
  console.log(this.addBooksData.value);
    
  this.book.saveGenreData(this.addBooksData.value).subscribe();
  this.bookC.modal = status;
  this.bookC.ngOnInit();
  }
}

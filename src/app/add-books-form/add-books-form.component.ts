import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from './../books.service';
import { GenreService } from './../genre.service';
import { AuthorService } from './../author.service';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-add-books-form',
  templateUrl: './add-books-form.component.html',
  styleUrls: ['./add-books-form.component.css'],
})
export class AddBooksFormComponent implements OnInit {
  modalTitle = 'ADD NEW BOOK';
  editId = 0;
  genreList: any = [];
  authorList: any = [];
  authorResultList: any = [];
  value = [];

  public isDisabledAuthors = true;
  public defaultItemGenres = {
    genreName: 'Select genre',
    genreId: null,
  };

  public defaultItemAuthors = {
    authorName: 'Select author',
    authorId: null,
  };

  public selectedGenre = undefined;
  public selectedAuthor = undefined;

  public addBooksData: FormGroup = new FormGroup({
    booksName: new FormControl(''),
    booksDate: new FormControl(''),
    genreList: new FormControl(''),
    authorResultList: new FormControl(''),
  });

  handleGenreChange(value: any) {
   
    if (value === undefined) {
      this.isDisabledAuthors = true;
      // this.authorList = [];
    } else {
      this.isDisabledAuthors = false;
      this.authorResultList = this.authorList.filter((s: any) => {
        return s.genreList.some((item: any) => {
          return item.genreName === value.genreName;
        });
      });
    }
        
    this.addBooksData.get('genreName')?.patchValue(value);
    console.log('genre=', this.addBooksData.get('genreName')?.value);

    this.addBooksData = new FormGroup({
      booksName: new FormControl(this.addBooksData.value.booksName),
      booksDate: new FormControl(this.addBooksData.value.booksDate),
      genreList: new FormControl(this.addBooksData.value.genreList),
      authorResultList: new FormControl(this.addBooksData.value.authorResultList),
    });
    console.log(this.addBooksData.value);
  }

  handleAuthorChange(value: any) {
    this.addBooksData.get('authorName')?.patchValue(value);
    console.log('authorName=', this.addBooksData.get('authorName')?.value);
  }

  @Output() close = new EventEmitter<void>();

  constructor(
    private book: BooksService,
    private genre: GenreService,
    private author: AuthorService,
    private bookC: BooksComponent
  ) {}

  ngOnInit(): void {
    this.genre.getAllGenre().subscribe((allGenreData) => {
      console.log(allGenreData);
      this.genreList = allGenreData;
    });

    this.author.getAllAuthor().subscribe((allAuthorsData) => {
      console.log(allAuthorsData);
      this.authorList = allAuthorsData;
    });

    if (this.bookC.editMode) {
      console.log(this.bookC.addBooksData.value);
      this.editId = this.bookC.addBooksData.value.booksName.id;
        console.log(this.bookC.addBooksData.value);

      this.addBooksData = new FormGroup({
        booksName: new FormControl(this.bookC.addBooksData.value.booksName),
        booksDate: new FormControl(this.bookC.addBooksData.value.booksDate),
        genreList: new FormControl(this.bookC.addBooksData.value.genreList),
        authorResultList: new FormControl(
          this.bookC.addBooksData.value.authorResultList
        ),
      });

      // console.log(this.addBooksData.controls['genreName'].setValue(this.bookC.addBooksData.value.genreName));
      console.log(this.bookC.addBooksData.value.genreName);

      this.addBooksData
        .get('genreName')
        ?.patchValue(this.bookC.addBooksData.value.genreName);
      console.log(
        this.addBooksData.controls['genreName'].setValue(
          this.bookC.addBooksData.value.genreName
        )
      );
      // console.log("genreName=",this.addBooksData.get('genreName')?.value)
    } else {
      this.bookC.editMode = false;
      this.addBooksData = new FormGroup({
        booksName: new FormControl(''),
        booksDate: new FormControl(''),
        genreList: new FormControl(''),
        authorResultList: new FormControl(''),
      });
    }
  }

  SaveData(event: any, status: boolean) {
    console.log(event.target);
    
    // this.addBooksData.get('authorName')?.patchValue(event.target.value);
    // console.log("author",this.addBooksData.get('authorName')?.value)
    if (this.bookC.editMode) {
      this.book
        .updateBooksData(this.editId, this.addBooksData.value)
        .subscribe();
      this.bookC.editMode = false;
      this.bookC.modal = status;
      this.bookC.ngOnInit();
    } else {
      if (
        this.addBooksData.value.booksName === '' ||
        this.addBooksData.value.booksDate === '' ||
        this.addBooksData.value.genreName === '' ||
        this.addBooksData.value.authorName === ''
      ) {
        alert("You can't write an empty value.");
      } else {
        this.addBooksData = new FormGroup({
          booksName: new FormControl(this.addBooksData.value.booksName),
          booksDate: new FormControl(this.addBooksData.value.booksDate),
          genreList: new FormControl(
            this.addBooksData.value.genreList
          ),
          authorResultList: new FormControl(this.addBooksData.value.authorResultList),
        });
        console.log(this.addBooksData.value);

        this.book.saveGenreData(this.addBooksData.value).subscribe();
        this.bookC.modal = status;
      }
    }

    this.bookC.ngOnInit();
  }
}

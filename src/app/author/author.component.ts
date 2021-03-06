import { Component, Input, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { GenreService } from './../genre.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {


  public opened = false;
  dataItem = "";
  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    if(status == 'yes') {
      this.deleteAuthor(this.dataItem);
    }
    this.opened = false;
    this.ngOnInit();
  }

  public open(dataItem:any): void {
    this.dataItem = dataItem;
    this.opened = true;
  }

  constructor(private author: AuthorService, private genre: GenreService) {}

  addAuthorData = new FormGroup({
    authorName: new FormControl(''),
    genreList: new FormControl(''),
  });

  editMode = false;
  authorData: any = [];
  genreData: any = [];
  public modal = false;

  ngOnInit(): void {
    this.author.getAllAuthor().subscribe((allData) => {
      console.log(allData);
      this.authorData = allData;
      console.log(this.authorData);
    });

    this.genre.getAllGenre().subscribe((allData) => {
      console.log(allData);
      this.genreData = allData;
      console.log(this.genreData);
    });
  }

  deleteAuthor(dataItem: any) {
      this.author.deleteAuthor(dataItem).subscribe();
      this.ngOnInit();
   }

  editAuthor(dataItem: any) {
    console.log('dataitem խմբագրելուց-', dataItem);

    this.modal = true;
    this.editMode = true;
    this.addAuthorData = new FormGroup({
      authorName: new FormControl(dataItem),
      genreList: new FormControl(dataItem),
    });
  }
}

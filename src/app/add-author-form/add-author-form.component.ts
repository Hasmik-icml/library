import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthorService } from './../author.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AuthorComponent } from '../author/author.component';
import { GenreComponent } from './../genre/genre.component';
import { GenreService } from './../genre.service';

@Component({
  selector: 'app-add-author-form',
  templateUrl: './add-author-form.component.html',
  styleUrls: ['./add-author-form.component.css'],
})
export class AddAuthorFormComponent implements OnInit {
  modalTitle = 'ADD NEW AUTHOR';
  editId = 0;
  genreData: any = [];
  genreList: any = [];

  @Output() close = new EventEmitter<void>();

  constructor(
    private author: AuthorService,
    private genre: GenreService,
    private authorC: AuthorComponent,
    private genreC: GenreComponent
  ) {}

  addAuthorData = new FormGroup({
    authorName: new FormControl(''),
    genreList: new FormControl(''),
  });

  onCheckChange(item: any) {
    console.log(item);
    item.selected = !item.selected;
    console.log(item);

    this.genreList.push(item);
    console.log(
      this.genreList.filter(function (item: any) {
        return item.selected !== false;
      })
    );

    this.addAuthorData = new FormGroup({
      authorName: new FormControl(this.addAuthorData.value.authorName),
      genreList: new FormControl(
        this.genreList.filter(function (item: any) {
          return item.selected !== false;
        })
      ),
    });
  }

  ngOnInit(): void {
    this.genre.getAllGenre().subscribe((allData) => {
      console.log(allData);
      this.genreData = allData;
      console.log(this.genreData);
    });

    if (this.authorC.editMode) {
      this.editId = this.authorC.addAuthorData.value.authorName.id;
      console.log(
        'տեսնել խմբագրան տվյալները-',
        this.authorC.addAuthorData.value.genreList.genreList
      );

      this.addAuthorData = new FormGroup({
        authorName: new FormControl(
          this.authorC.addAuthorData.value.authorName.authorName
        ),
        genreList: new FormControl(
          this.authorC.addAuthorData.value.genreList.genreList
        ),
      });
    } else {
      this.authorC.editMode = false;
      this.addAuthorData = new FormGroup({
        authorName: new FormControl(''),
        genreList: new FormControl(''),
      });
    }
  }

  SaveData(status: boolean) {
    console.log('data=', this.addAuthorData);

    console.log('edit mod=', this.authorC.editMode, this.editId);
    if (this.authorC.editMode) {
      this.author
        .updateAuthorData(this.editId, this.addAuthorData.value)
        .subscribe();
      this.authorC.editMode = false;
      this.authorC.modal = status;
      this.authorC.ngOnInit();
    } else {
      console.log(this.addAuthorData.value);
      console.log('status=', status);
      if (this.addAuthorData.value.authorName === '') {
        alert("You can't write an empty value.");
      } else {
        this.author.saveAuthorData(this.addAuthorData.value).subscribe();
        this.authorC.modal = status;
      }
      this.authorC.ngOnInit();
    }
  }
}

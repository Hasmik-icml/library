import { Component, EventEmitter, OnInit, Output , Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GenreService } from '../genre.service';
import { GenreComponent } from '../genre/genre.component';
 

@Component({
  selector: 'app-add-genre-form',
  templateUrl: './add-genre-form.component.html',
  styleUrls: ['./add-genre-form.component.css']
})
export class AddGenreFormComponent implements OnInit {
   modalTitle = "ADD NEW GENRE";
  //  editMode = false;
   editId = 0;
   @Output() close = new EventEmitter<void>() 

  constructor(private genre: GenreService, private genreC: GenreComponent) { }

    addGenreData = new FormGroup({
        genreName: new FormControl('')
    });


  ngOnInit(): void {
    console.log(this.genreC.editMode);
    
      if(this.genreC.editMode){
        this.editId = this.genreC.addGenreData.value.genreName.id;
        this.addGenreData = new FormGroup({
          genreName: new FormControl(this.genreC.addGenreData.value.genreName.genreName)
        });
      }else{
        this.genreC.editMode = false;
        this.addGenreData = new FormGroup({
          genreName: new FormControl('')
        });
      }
    
  console.log("edit mod=",   this.genreC.editMode);
  }

  SaveData(status:boolean){
    console.log("edit mod=",   this.genreC.editMode, this.editId);
    if(this.genreC.editMode){
      this.genre.updateGenreData(this.editId, this.addGenreData.value).subscribe();
      this.genreC.editMode = false;
      this.genreC.modal = status;
      this.genreC.ngOnInit();
      this.addGenreData = new FormGroup({
        genreName: new FormControl('')
    });
    }else{
      console.log((this.addGenreData.value));
      console.log("status=", status);
      
      if (this.addGenreData.value.genreName === "" ){
        alert("You can't write an empty value.");
      }else{
        this.genre.saveGenreData(this.addGenreData.value).subscribe();
        this.genreC.modal = status;
      }
      this.genreC.ngOnInit();
    }

  }
}

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
  
   @Output() close = new EventEmitter<void>()

  constructor(private genre: GenreService, private st: GenreComponent) { }

    addGenreData = new FormGroup({
    genreName: new FormControl('')
  });

  ngOnInit(): void {
  }

  SaveData(status:boolean){
    console.log((this.addGenreData.value));
    console.log("status=", status);
    if (this.addGenreData.value.genreName === "" ){
      alert("You can't write an empty value.");
    }else{
      this.genre.saveGenreData(this.addGenreData.value).subscribe();
      this.st.modal = status;
    }
    this.st.ngOnInit();
  }
}

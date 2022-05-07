import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  constructor(private genre:GenreService) { }

  addGenreData = new FormGroup({
      genreName: new FormControl('')
  });

  editMode = false;
  genreData: any =[];
  public modal = false;

  ngOnInit(): void {
    this.genre.getAllGenre().subscribe((allData)=>{
      console.log(allData);
      this.genreData = allData
    });
    
  }
  deleteGenre(dataItem:any){
      console.log(dataItem);
      this.genre.deleteGenre(dataItem).subscribe();
      this.ngOnInit();
  }
  
  editGenre(dataItem: any){
    console.log(dataItem);
    this.modal = true;
    this.editMode = true;
    this.addGenreData = new FormGroup({
      genreName: new FormControl(dataItem)
  });
    console.log("modal=", this.addGenreData);
    
  }

}

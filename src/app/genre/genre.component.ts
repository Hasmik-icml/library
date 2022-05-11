import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from "@angular/core";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GenreComponent implements OnInit {

  public opened = false;
  dataItem = "";
  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    if(status == 'yes') {
      this.deleteGenre(this.dataItem);
    }
    this.opened = false;
    this.ngOnInit();
  }

  public open(dataItem:any): void {
    this.dataItem = dataItem;
    this.opened = true;
  }



  constructor(private genre:GenreService) { }

  addGenreData = new FormGroup({
      genreName: new FormControl('')
  });

  editMode = false;
  public genreData: any = [];
  public modal = false;

  ngOnInit(): void {
    this.genre.getAllGenre().subscribe((allData:any)=>{
        
      this.genreData = allData;
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

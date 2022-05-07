import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  constructor(private genre:GenreService) { }
  
  genreData: any =[];
  modal = false;

  ngOnInit(): void {
    
    this.genre.getAllGenre().subscribe((allData)=>{
      console.log(allData);
      this.genreData = allData
  
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient) { }
  getAllGenre(){
    return this.http.get('http://localhost:3000/genre');
  }
  saveGenreData(data: any){
    console.log("data=", data);
    return this.http.post('http://localhost:3000/genre', data);
  }
  deleteGenre(dataItem: any){
    // console.log("for delete=", dataItem);
    // console.log('http://localhost:3000/genre/'+ `${dataItem}`);
    return this.http.delete('http://localhost:3000/genre/'+ `${dataItem}`);
  }
}

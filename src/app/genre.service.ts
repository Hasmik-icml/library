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
}

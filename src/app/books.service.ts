import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  getAllBooks(){
    return this.http.get('http://localhost:3000/books');
  }

  deleteBooks(dataItem: any){
      return this.http.delete('http://localhost:3000/books/'+ `${dataItem}`);
  }
  saveGenreData(data: any){

    return this.http.post('http://localhost:3000/books', data);
  }
}

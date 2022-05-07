import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  getAllAuthor(){
    return this.http.get('http://localhost:3000/authors');
  }

  deleteAuthor(dataItem: any){
    return this.http.delete('http://localhost:3000/authors/'+ `${dataItem}`);
  }

}

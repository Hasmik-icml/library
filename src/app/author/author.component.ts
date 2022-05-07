import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private author:AuthorService) { }

  addAuthorData = new FormGroup({
    authorName: new FormControl('')
  });

  authorData: any =[];
  public modal = false;

  ngOnInit(): void {
    this.author.getAllAuthor().subscribe((allData)=>{
      console.log(allData);
      this.authorData = allData;
    });
  }

  deleteAuthor(dataItem:any){
    // console.log(dataItem);
    this.author.deleteAuthor(dataItem).subscribe();
    this.ngOnInit();
}

 

}

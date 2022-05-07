import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { AuthorService } from './../author.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorComponent } from '../author/author.component';


@Component({
  selector: 'app-add-author-form',
  templateUrl: './add-author-form.component.html',
  styleUrls: ['./add-author-form.component.css']
})
export class AddAuthorFormComponent implements OnInit {
  modalTitle = "ADD NEW AUTHOR";

  editId = 0;

  @Output() close = new EventEmitter<void>()

  constructor(private author: AuthorService, private authorC:AuthorComponent) { }

  addAuthorData = new FormGroup({
    authorName: new FormControl('')
  });

  ngOnInit(): void {
    if(this.authorC.editMode){
      this.editId = this.authorC.addAuthorData.value.authorName.id;
      this.addAuthorData = new FormGroup({
        authorName: new FormControl(this.authorC.addAuthorData.value.authorName.authorName)
      });
    }else{
      this.authorC.editMode = false;
      this.addAuthorData = new FormGroup({
        authorName: new FormControl('')
      });
    }  
  }

  SaveData(status:boolean){
    console.log("edit mod=",   this.authorC.editMode, this.editId);
   if(this.authorC.editMode){
    this.author.updateAuthorData(this.editId, this.addAuthorData.value).subscribe();
    this.authorC.editMode = false;
    this.authorC.modal = status;
    this.authorC.ngOnInit();
   }else{
      console.log((this.addAuthorData.value));
      console.log("status=", status);
      if (this.addAuthorData.value.authorName === "" ){
        alert("You can't write an empty value.");
      }else{
        this.author.saveAuthorData(this.addAuthorData.value).subscribe();
        this.authorC.modal = status;
      }
      this.authorC.ngOnInit();
   }

  }
}

import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { AuthorService } from './../author.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-author-form',
  templateUrl: './add-author-form.component.html',
  styleUrls: ['./add-author-form.component.css']
})
export class AddAuthorFormComponent implements OnInit {
  modalTitle = "ADD NEW AUTHOR";
  editMode = false;
  editId = 0;

  @Output() close = new EventEmitter<void>()

  constructor(private author: AuthorService) { }

  addAuthorData = new FormGroup({
    authorName: new FormControl('')
  });

  ngOnInit(): void {
  }

}

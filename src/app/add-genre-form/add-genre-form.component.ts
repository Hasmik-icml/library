import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-genre-form',
  templateUrl: './add-genre-form.component.html',
  styleUrls: ['./add-genre-form.component.css']
})
export class AddGenreFormComponent implements OnInit {
   modalTitle = "ADD NEW GENRE";

   @Output() close = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}

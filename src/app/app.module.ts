import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AuthorComponent } from './author/author.component';
import { GenreComponent } from './genre/genre.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddGenreFormComponent } from './add-genre-form/add-genre-form.component';
import { AddAuthorFormComponent } from './add-author-form/add-author-form.component';
import { FormsModule } from '@angular/forms';
import { AddBooksFormComponent } from './add-books-form/add-books-form.component';

const appRoutes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'book', component: BooksComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'genre', component: GenreComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorComponent,
    GenreComponent,
    AddGenreFormComponent,
    AddAuthorFormComponent,
    AddBooksFormComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    GridModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ButtonsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

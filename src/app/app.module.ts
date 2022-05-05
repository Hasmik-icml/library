import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AuthorComponent } from './author/author.component';
import { GenreComponent } from './genre/genre.component';
import {MatIconModule} from '@angular/material/icon';
import {Routes, RouterModule} from '@angular/router';

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
    GenreComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

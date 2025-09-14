import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { GenreModel } from '../../models/genre.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public genreList: GenreModel[] = []
  public email = ''
  public password = ''
  public repeatPassword = ''
  public firstName = ''
  public lastName = ''
  public phone = ''
  public address = ''
  public favouriteGenre = ''

  public doSignup() {

  }

  public constructor(){
    MovieService.getMovieGenres()
    .then(rsp => this.genreList = rsp.data)
  }
}

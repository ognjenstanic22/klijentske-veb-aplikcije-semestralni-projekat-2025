import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { GenreModel } from '../../models/genre.model';
import { MovieService } from '../../services/movie.service';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, NgFor, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatButtonModule, MatSelectModule],
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

  public constructor(private router: Router) {
    MovieService.getMovieGenres()
      .then(rsp => this.genreList = rsp.data)
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email i lozinka su obavezna polja!')
      return
    }

    if (this.password !== this.repeatPassword) {
      alert('Lozinke nisu iste!')
      return
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favouriteGenre: this.favouriteGenre,
      orders: []
    })

    result ? this.router.navigate(['/login']) : alert('Nalog sa ovim Email-om već postoji')
  }

}

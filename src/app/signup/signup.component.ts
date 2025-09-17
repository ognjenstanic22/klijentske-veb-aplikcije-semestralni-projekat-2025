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
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: "error",
        text: "Loša e-mail adresa ili šifra!",
        customClass: {
          popup: 'bg-dark'
        }
      });

      return
    }

    if (this.password !== this.repeatPassword) {
      Swal.fire({
        icon: "error",
        text: "Lozinke nisu iste!",
        customClass: {
          popup: 'bg-dark'
        }
      });
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

    if (result) {
      Swal.fire({
        icon: "success",
        text: "Uspešno kreiran nalog!",
        customClass: {
          popup: 'bg-dark'
        }
      });
    }

    result ? this.router.navigate(['/login']) : Swal.fire({
      icon: "error",
      text: "Nalog sa ovim Email-om već postoji!",
      customClass: {
        popup: 'bg-dark'
      }
    });
  }

}

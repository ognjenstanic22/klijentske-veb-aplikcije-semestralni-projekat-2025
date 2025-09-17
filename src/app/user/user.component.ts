import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';
import { OrderModel } from '../../models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GenreModel } from '../../models/genre.model';
import { MovieService } from '../../services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  imports: [
    NgIf,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgFor,
    MatAccordion,
    MatExpansionModule,
    MatSelectModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public user: UserModel | null = null
  public userCopy: UserModel | null = null

  public oldPasswordValue = ''
  public newPasswrodValue = ''
  public repeatPasswordValue = ''

  public genreList: GenreModel[] = []

  constructor(private router: Router, public utils: UtilsService) {
    if (!UserService.getActiveUser()) {
      // korisnik nije ulogovan
      // vrati korisnika na home page
      router.navigate(['/home'])
      return
    }

    this.user = UserService.getActiveUser()
    this.userCopy = UserService.getActiveUser()
    MovieService.getMovieGenres()
      .then(rsp => this.genreList = rsp.data)
  }

  public doUpdateUser() {
    if (this.userCopy == null) {
      Swal.fire({
        icon: "error",
        text: "Korisnik ne postoji!",
        customClass: {
          popup: 'bg-dark'
        }
      });
      return
    }

    UserService.updateUser(this.userCopy)
    this.user = UserService.getActiveUser()
    Swal.fire({
      icon: "success",
      text: "Uspešno ste promenili podatke!",
      customClass: {
        popup: 'bg-dark'
      }
    });
  }

  public doChangePassword() {

    if (this.newPasswrodValue == '' || this.oldPasswordValue == '' || this.repeatPasswordValue == '') {
      Swal.fire({
        icon: "error",
        text: "Lozinke ne mogu biti prazne!",
        customClass: {
          popup: 'bg-dark'
        }
      });
      return
    }

    if (this.newPasswrodValue !== this.repeatPasswordValue) {
      Swal.fire({
        icon: "error",
        text: "Lozinke se ne poklapaju!",
        customClass: {
          popup: 'bg-dark'
        }
      });
      return
    }

    if (this.oldPasswordValue !== this.user?.password) {
      Swal.fire({
        icon: "error",
        text: "Stara lozinka nije ispravna!",
        customClass: {
          popup: 'bg-dark'
        }
      });
      return
    }

    const result = UserService.changePassword(this.newPasswrodValue)

    if (result) {
      Swal.fire({
        icon: "success",
        text: "Lozinka uspešno promenjena!",
        customClass: {
          popup: 'bg-dark'
        }
      });

      this.user = UserService.getActiveUser()
    } else {
      Swal.fire({
        icon: "error",
        text: "Lozinka nije promenjena!",
        customClass: {
          popup: 'bg-dark'
        }
      });
    }

    this.oldPasswordValue = ''
    this.newPasswrodValue = ''
    this.repeatPasswordValue = ''
  }

  public doPay(order: OrderModel) {
    if (UserService.changeOrderStatus('gledano', order.id)) {
      this.user = UserService.getActiveUser()
    }

    Swal.fire({
        icon: "success",
        text: "Uspešno plaćeno!",
        customClass: {
          popup: 'bg-dark'
        }
    });
  }

  public doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus('otkazano', order.id)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doRating(order: OrderModel, r: boolean) {
    if (UserService.changeRating(r, order.id)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doDeleteOrder(order: OrderModel) {
    if (UserService.deleteOrder(order)) {
      this.user = UserService.getActiveUser()
    }

    Swal.fire({
        icon: "success",
        text: "Rezervacija uspešno obrisana!",
        customClass: {
          popup: 'bg-dark'
        }
      });
  }

}

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
  public userCopy : UserModel | null = null

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

  public doUpdateUser(){
    if(this.userCopy == null){
      alert('Korisnik ne postoji')
      return
    }

    UserService.updateUser(this.userCopy)
    this.user = UserService.getActiveUser()
    alert('Podaci su promenjeni')
  }

  public doChangePassword() {

    if (this.newPasswrodValue == '' || this.oldPasswordValue == '' || this.repeatPasswordValue == '') {
      alert('Lozinke ne mogu biti prazne')
      return
    }

    if (this.newPasswrodValue !== this.repeatPasswordValue) {
      alert('Lozinke se ne poklapaju')
      return
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Stara lozinka nije ispravna')
      return
    }

    alert(UserService.changePassword(this.newPasswrodValue) ?
      'Lozinka uspešno promenjena' : 'Lozinka nije promenjena'
    )

    this.oldPasswordValue = ''
    this.newPasswrodValue = ''
    this.repeatPasswordValue = ''
  }

  public doPay(order: OrderModel) {
    if (UserService.changeOrderStatus('gledano', order.id)) {
      this.user = UserService.getActiveUser()
    }
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

}

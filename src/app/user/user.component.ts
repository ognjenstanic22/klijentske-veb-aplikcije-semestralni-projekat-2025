import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import {  NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { UtilsService } from '../../services/utils.service';
import { OrderModel } from '../../models/order.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [NgIf, MatButtonModule, MatCardModule, MatTableModule, RouterLink, MatFormFieldModule, FormsModule, NgFor, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['title', 'runTime', 'director.name', 'count', 'price', 'status', 'rating','total', 'actions'];
  public user: UserModel | null = null

  constructor(private router: Router, public utils: UtilsService) {
    if (!UserService.getActiveUser()) {
      // korisnik nije ulogovan
      // vrati korisnika na home page
      router.navigate(['/home'])
      return
    }

    this.user = UserService.getActiveUser()
  }

  public doChangePassword() {
    const newPassword = prompt('Unesite novu lozinku')

    if (newPassword == '' || newPassword == null) {
      alert('Lozinka ne može biti prazna')
      return
    }

    alert(UserService.changePassword(newPassword) ? 'Lozinka uspešno promenjena' : 'Lozinka nije promenjena')

  }

  public doPay(order: OrderModel) {
    if(UserService.changeOrderStatus('gledano', order.id)){
      this.user = UserService.getActiveUser()
    }
  }

  public doCancel(order: OrderModel) {
    if(UserService.changeOrderStatus('otkazano', order.id)){
      this.user = UserService.getActiveUser()
    }
  }

  public doRating(order: OrderModel, r:boolean) {
    if(UserService.changeRating(r, order.id)){
      this.user = UserService.getActiveUser()
    }
  }

}

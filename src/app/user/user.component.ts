import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import {  NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { UtilsService } from '../../services/utils.service';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-user',
  imports: [NgIf, MatButtonModule, MatCardModule, MatTableModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['title', 'runTime', 'director.name', 'count', 'price', 'status', 'total', 'actions'];
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
    if(UserService.changeOrderStatus('gledano', order.shortUrl)){
      this.user = UserService.getActiveUser()
    }
  }

  public doCancel(order: OrderModel) {
    if(UserService.changeOrderStatus('otkazano', order.shortUrl)){
      this.user = UserService.getActiveUser()
    }
  }

}

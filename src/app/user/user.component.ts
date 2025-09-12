import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { OrderModel } from '../../models/order.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [NgIf, NgFor],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public orders: OrderModel[] = []

  constructor(private router: Router) {
    if (!UserService.getActiveUser()) {
      // korisnik nije ulogovan
      // vrati korisnika na home page
      router.navigate(['/home'])
      return
    }

    this.orders = UserService.getActiveUser()!.orders
  }

}

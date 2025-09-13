import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-user',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['title', 'runTime', 'director.name', 'price', 'total', 'actions'];
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

}

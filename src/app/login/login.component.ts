import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string = ''
  public password: string = ''

  constructor(private router: Router) { 
    if(UserService.getActiveUser()){
      router.navigate(['/user'])
      return
    }
  }

  public doLogin() {
    if (UserService.login(this.email, this.password)) {
      // redirect to profile
      this.router.navigate(['/user'])
      return
    }

    alert('Loša e-mail adresa ili šifra')
  }

}

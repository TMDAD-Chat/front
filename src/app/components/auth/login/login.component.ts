import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(() => {
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

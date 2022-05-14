import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private httpService: HttpService) { }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then((value) => {
        if(value) {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 10);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

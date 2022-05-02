import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {User} from "../../../util/dto/user";
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
      .then((value: UserCredential) => {
        console.log("Logged user %s with google...", value.user?.email)

        if(value.user !== null && value.user.displayName !== null && value.user.email !== null && value.user.photoURL !== null) {
          const user: User = {
            name: value.user.displayName,
            email: value.user.email,
            photoUri: value.user.photoURL
          }

          this.httpService.registerUser(user).subscribe(() => {
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 1000);
          });
        }else{
          this.authService.logout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

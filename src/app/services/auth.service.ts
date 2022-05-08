import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../util/dto/user';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;
  userDetails!: firebase.User;
  constructor(private firebaseAuth: AngularFireAuth, private httpClient: HttpClient) {
    this.user$ = firebaseAuth.authState;
    this.user$.subscribe({
      next: (data) => {
        if (data) {
          this.userDetails = data;
        }
      },
      error: () => {
        console.log('Auth error');
      }
    })
  }

  async signInWithGoogle() {
    const value = await this.firebaseAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if(value.user !== null && !!value.user.displayName && !!value.user.email && !!value.user.photoURL) {
      const user: User = {
        name: value.user.displayName,
        email: value.user.email,
        photoUri: value.user.photoURL
      }

      return await firstValueFrom(this.registerUser(user));
    }else{
      this.logout();
      return null;
    }
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  registerUser(user: User) {
    return this.httpClient.put<User>(
      Constants.getOrCreateUserEnpoint(encodeURI(user.email)),
      user
    );
  }
}

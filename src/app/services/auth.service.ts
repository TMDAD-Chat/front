import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user$ = firebaseAuth.authState;
    this.user$.subscribe({
      next: (data) => {
        console.log(data);
      },
    })
  }

  signInWithGoogle() {
    return this.firebaseAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}

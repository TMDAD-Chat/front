import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Verify active session
   * @returns boolean
   */
  canLoad() {
    return this.auth.user$.pipe(
      map((user) => !!user),
      tap((validUser) => {
        if (!validUser) this.goToLogin();
      })
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

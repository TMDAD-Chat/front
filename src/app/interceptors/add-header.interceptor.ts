import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable, switchMap} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return  from(this.authService.getToken()).pipe(
      switchMap(data => {
        const token = data.left;
        const user = data.right;
        // Clone the request to add the new header
        const newHeaders = request.headers
          .append('X-Auth-Firebase', token)
          .append('X-Auth-User', user)
        const clonedRequest = request.clone({headers: newHeaders});

        // Pass the cloned request instead of the original request to the next handle
        return next.handle(clonedRequest);
      })
    )
  }
}

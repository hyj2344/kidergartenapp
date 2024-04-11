import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser:User;
    // just by taking one thing from this observable what we're doing here is
    // we're saying that we want to complete after we've received one of these current users and this way we don't need to
    // unsubscribe because once an observable has completed then we are effectively not subscribed to it anymore
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>currentUser=user);
        if (currentUser) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
            }
          })
        }
        return next.handle(request);
      }
  }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
// services are Singleton, the data that we store inside a service doesn't get destroyed until our application is closed down or refresh the page
// components are different when we move from component to component in angular they are destroyed as soon as they're not in use
export class AccountService {
  baseUrl = environment.apiUrl;

  // a replay subject is kind of buffer object it's going to store the values inside here
  // and anytime a subscriber subscribes to this observable it's going to emit the last value inside it
  private currentUserSource = new ReplaySubject<User>(1);
  //add $ as a observable
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private presence:PresenceService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token: string) {
    // token comes in three parts we have our header we have our payload and then
    // a signature the part that we're interested in is the middle part
    return JSON.parse(atob(token.split('.')[1]));
  }
}

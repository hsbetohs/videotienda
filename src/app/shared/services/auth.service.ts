import { Injectable, Input } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { UserInterface } from '../models/user.model';
import { Proxy } from './proxy';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private proxy: Proxy) { }

  logIn(input: UserInterface): Observable<UserInterface> {
    return this.proxy.executeGet('users', '', false).pipe(
      map((response) => response.filter(user => (user.email === input.email && user.password  === input.password))),
      map((response) => response[0]));
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

}

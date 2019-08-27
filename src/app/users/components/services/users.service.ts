import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Proxy } from '../../../shared/services/proxy';
import { Observable } from 'rxjs';
import { UserInterface } from '../../../shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private proxy: Proxy) { }

  createUser(input: UserInterface): Observable<UserInterface> {
    return this.proxy.executePost('users', input, null).pipe(map((resp) => this.mapCreateUserDataResponse(resp)));
  }

  mapCreateUserDataResponse(info: any): UserInterface {
    return info as UserInterface;
  }

  getUsers(input: string): Observable<Array<UserInterface>> {
    return this.proxy.executeGet('users', input, null).pipe(map((resp) => this.mapGetUserDataResponse(resp)));
  }

  mapGetUserDataResponse(info: any): Array<UserInterface> {
    return info as Array<UserInterface>;
  }
}

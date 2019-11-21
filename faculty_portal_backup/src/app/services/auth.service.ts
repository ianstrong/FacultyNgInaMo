import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

const TOKEN_KEY = 'FS_token';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  authCredentials: any = {};
  authenticationState = new BehaviorSubject(false);

  constructor(private ds: DataService) { }

  login(token) {
    console.log(token);
    this.authenticationState.next(true);
    localStorage.setItem(TOKEN_KEY, token);
  }

  logout() {
    this.authenticationState.next(false);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('FS_info');
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}

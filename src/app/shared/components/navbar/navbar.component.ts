import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../../users/components/services/users.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }
  appName = 'Video Tarzan';
  isAdmin = false;
  ngOnInit() {
    this.getCurrentUser();
  }

  get isLogged(): boolean {
    return this.getCurrentUser();
  }

  getCurrentUser(): boolean {
    if (localStorage.getItem('user')) {
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
      return true;
    } else {
      return false;
    }
  }

  onLogout() {
    this.authService.logoutUser();
  }


}

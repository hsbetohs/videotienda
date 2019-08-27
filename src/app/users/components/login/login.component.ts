import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersFormsService } from '../services/users.forms.service';
import { FormGroup } from '@angular/forms';
import { UserInterface } from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError = false;
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private userFormService: UsersFormsService) { }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.userFormService.getLoginForm();
  }

  onLogin(): void {
    const user: UserInterface = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.authService.logIn(user).subscribe(response => {
      if (response) {
        localStorage.setItem('user', JSON.stringify(response.id));
        localStorage.setItem('isAdmin', JSON.stringify(response.rol.admin));
        this.onLoginRedirect();
      } else {
        this.isError = true;
      }
    });

  }

  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(['administration/home']);
  }
}

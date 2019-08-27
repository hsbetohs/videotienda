import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../../shared/models/user.model';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: '',
    id: 0,
    password: '',
    rol: {}
  };
  ngOnInit() {
    this.userService.getUsers(`id=${localStorage.getItem('user')}`).subscribe(response => {
      this.user = response[0];
    });
  }

}

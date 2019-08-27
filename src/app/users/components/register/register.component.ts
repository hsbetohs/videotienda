import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup } from '@angular/forms';
import { UsersFormsService } from '../services/users.forms.service';
import { UserService } from '../services/users.service';
import { UserInterface } from '../../../shared/models/user.model';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private usersFormsService: UsersFormsService, private userService: UserService) { }
  @ViewChild('imageUser', {static: false}) inputImageUser: ElementRef;
  isError = false;
  msgError = '';
  userForm: FormGroup;
  messageType: string;
  uploadPercent: Observable<number>;
  urlImage: string;

  ngOnInit() {
    this.userForm = this.usersFormsService.getCreateForm();
  }

  onUpload(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(reader.result);
    reader.onload = () => {
      this.urlImage = reader.result.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onAddUser() {
    const userInterface: UserInterface = {
      id: 0,
      name: this.userForm.get('name').value,
      email: this.userForm.get('email').value,
      password: this.userForm.get('password').value,
      photoUrl: this.urlImage,
      rol: {
        admin: this.userForm.get('rol').value === 'admin' ? true : false,
        editor: this.userForm.get('rol').value === 'user' ? true : false,
      }
    };
    this.userService.createUser(userInterface).subscribe(response => {
      console.log(response);
      if (response && response.id > 0) {
        this.messageType = 'success';
        this.msgError = 'Usuario creado exitosamente';
      } else {
        this.messageType = 'error';
        this.msgError = 'Error crendo el usuario, intente nuevamente';
      }
    });
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

}

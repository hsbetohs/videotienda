import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { USERS_ROUTES } from './users.routing';
import { SharedModule } from '../shared/shared.module';
import { UsersFormsService } from './components/services/users.forms.service';


@NgModule({
    imports: [
      SharedModule,
      USERS_ROUTES
    ],
    declarations: [
      LoginComponent,
      ProfileComponent,
      RegisterComponent
    ],
    exports: [
      LoginComponent,
      ProfileComponent,
      RegisterComponent
    ],
    providers: [
      UsersFormsService
    ]
})
export class UsersModule { }

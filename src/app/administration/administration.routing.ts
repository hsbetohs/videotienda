import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { HomeComponent } from './components/home/home.component';

const UsersRoutes: Routes = [
  { path: '', redirectTo: 'administration/home', pathMatch: 'full' },
  { path: 'administration/movies', component: MoviesListComponent, canActivate: [AuthGuard] },
  { path: 'administration/home', component: HomeComponent, canActivate: [AuthGuard] },
];

export const ADMINISTRATION_ROUTES = RouterModule.forChild(UsersRoutes);

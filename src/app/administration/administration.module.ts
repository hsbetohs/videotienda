import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ADMINISTRATION_ROUTES } from './administration.routing';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { MoviesFormsService } from './services/movies.forms.service';
import { HomeComponent } from './components/home/home.component';


@NgModule({
    imports: [
      SharedModule,
      ADMINISTRATION_ROUTES
    ],
    declarations: [
      MoviesListComponent,
      HomeComponent,
      ModalComponent
    ],
    exports: [
      MoviesListComponent,
      HomeComponent,
      ModalComponent
    ],
    providers: [
      MoviesFormsService
    ]
})
export class AdministrationModule { }

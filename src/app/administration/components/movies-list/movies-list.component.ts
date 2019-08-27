import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../users/components/services/users.service';
import { MovieInterface } from '../../../shared/models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { MoviesFormsService } from '../../services/movies.forms.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private userService: UserService, private moviesService: MoviesService, private moviesFormsService: MoviesFormsService) { }
  @ViewChild('modal', { static: false }) modal: ModalComponent;
  movies: Array<MovieInterface>;
  isAdmin: any = null;
  msgError = '';
  messageType: string;

  ngOnInit() {
    this.getListMovies();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getUsers(`id=${localStorage.getItem('user')}`).subscribe(response => {
      this.isAdmin = response[0].rol.admin;
    });
  }
  getListMovies() {
    this.moviesService.getMovies('').subscribe(response => this.movies = response);
  }

  onDeleteMovie(idMovie: number): void {
    this.moviesService.deleteMovie(idMovie).subscribe(response => {
      if (response) {
        this.messageType = 'success';
        this.msgError = 'Se elimino la pelicual exitosamente';
      } else {
        this.messageType = 'error';
        this.msgError = 'Error eliminando la pelicula, intente nuevamente';
      }
    });
    setTimeout(() => {
      this.msgError = '';
      this.messageType = '';
   }, 3000);
  }

  onPreCreateMovie() {
    const movieInterface: MovieInterface = {};
    this.moviesFormsService.selectedMovie = Object.assign({}, movieInterface);
    this.modal.setFormData();
  }

  onPreUpdateMovie(movie: MovieInterface) {
    this.moviesFormsService.selectedMovie = Object.assign({}, movie);
    this.modal.setFormData();
  }

  onSaveSuccess(event) {
    this.getListMovies();
    this.msgError = event.msgError;
    this.messageType = event.messageType;
    setTimeout(() => {
      this.msgError = '';
      this.messageType = '';
   }, 3000);
  }

}

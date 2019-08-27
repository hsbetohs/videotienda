import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieInterface } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }
  public movies: Array<MovieInterface> = [];
  public searchText = '';
  msgError = '';
  messageType: string;

  ngOnInit() {
    this.moviesService.getMovies('').subscribe(resp => {
      if (resp.length > 0) {
        this.movies = resp;
      }
    });
  }

  onReserve(movie: MovieInterface) {
    movie.quantity--;
    this.moviesService.updateMovie(movie).subscribe(response => {
      if (response && response.id > 0) {
        this.messageType = 'success';
        this.msgError = 'Pelicuala reservada exitosamente';
      } else {
        this.messageType = 'error';
        this.msgError = 'Error al reservar la pelicula, intente nuevamente';
      }
    });
    setTimeout(() => {
      this.msgError = '';
      this.messageType = '';
    }, 3000);
  }


}

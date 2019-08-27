import { Injectable, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Proxy } from '../../shared/services/proxy';
import { Observable } from 'rxjs';
import { MovieInterface } from '../../shared/models/movie.model';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private proxy: Proxy) {}

  createMovies(input: MovieInterface): Observable<MovieInterface> {
    return this.proxy.executePost('movies', input, null).pipe(map((resp) => this.mapCreateMoviesDataResponse(resp)));
  }

  mapCreateMoviesDataResponse(info: any): MovieInterface {
    return info as MovieInterface;
  }

  getMovies(input: string): Observable<Array<MovieInterface>> {
    return this.proxy.executeGet('movies', input, null).pipe(map((resp) => this.mapGetMoviesDataResponse(resp)));
  }

  mapGetMoviesDataResponse(info: any): Array<MovieInterface> {
    return info as Array<MovieInterface>;
  }

  deleteMovie(input: number) {
    return this.proxy.executeDelete(`movies/${input}`, '', false);
  }

  updateMovie(input: MovieInterface) {
    return this.proxy.executePut(`movies/${input.id}`, input, '', false);
  }

}

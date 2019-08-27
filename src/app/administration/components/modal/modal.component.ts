import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { MoviesFormsService } from '../../services/movies.forms.service';
import { MovieInterface } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public moviesService: MoviesService, public moviesFormService: MoviesFormsService) { }
  @ViewChild('btnClose', {static: false}) btnClose: ElementRef;
  @Input() title: string;
  @Output() resultSuccess = new EventEmitter<any>();
  msgError = '';
  messageType: string;
  formMovie: FormGroup;

  ngOnInit() {
    this.formMovie = this.moviesFormService.getModalForm();
  }

  setFormData() {
    if (this.moviesFormService.selectedMovie.id) {
      this.formMovie.setValue({
        id: this.moviesFormService.selectedMovie.id,
        name: this.moviesFormService.selectedMovie.name,
        description: this.moviesFormService.selectedMovie.description,
        actors: this.moviesFormService.selectedMovie.actors,
        director: this.moviesFormService.selectedMovie.director,
        rentalCost: this.moviesFormService.selectedMovie.rentalCost,
        quantity: this.moviesFormService.selectedMovie.quantity,
      });
    } else {
      this.formMovie.reset({});
    }
  }

  onSaveMovie() {
    const movie: MovieInterface = {
      actors: this.formMovie.get('actors').value,
      description: this.formMovie.get('description').value,
      director: this.formMovie.get('director').value,
      name: this.formMovie.get('name').value,
      rentalCost: this.formMovie.get('rentalCost').value,
      quantity: this.formMovie.get('quantity').value,
    };
    this.moviesService.createMovies(movie).subscribe(response => {
      if (response && response.id > 0) {
        this.resultSuccess.emit({ messageType: 'success', msgError: 'Peliculada creada exitosamente' });
        this.btnClose.nativeElement.click();
      } else {
        this.messageType = 'error';
        this.msgError = 'Error crendo la pelicula, intente nuevamente';
      }
    });
  }

  onUpdateMovie() {
    const movie: MovieInterface = {
      id:  this.formMovie.get('id').value,
      actors: this.formMovie.get('actors').value,
      description: this.formMovie.get('description').value,
      director: this.formMovie.get('director').value,
      name: this.formMovie.get('name').value,
      rentalCost: this.formMovie.get('rentalCost').value,
      quantity: this.formMovie.get('quantity').value,
    };
    this.moviesService.updateMovie(movie).subscribe(response => {
      if (response && response.id > 0) {
        this.resultSuccess.emit({ messageType: 'success', msgError: 'Peliculada actualizada exitosamente' });
        this.btnClose.nativeElement.click();
      } else {
        this.messageType = 'error';
        this.msgError = 'Error actualizando la pelicula, intente nuevamente';
      }
    });
  }

}

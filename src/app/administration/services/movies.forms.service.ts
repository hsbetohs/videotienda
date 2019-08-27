import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CustomValidators } from '../../shared/clasess/customValidators';
import { MovieInterface } from '../../shared/models/movie.model';

@Injectable()
export class MoviesFormsService {

  constructor(private formBuilder: FormBuilder) { }

  public selectedMovie: MovieInterface = {
    id: null,
  };

  getModalForm(): FormGroup {
    const form = this.formBuilder.group({
      id: [{ value: undefined, disabled: false }, []],
      name: [{ value: undefined, disabled: false },
        [Validators.required, CustomValidators.AlphaNumericWithWhiteSpace, CustomValidators.MaxLength(100)]],
      description: [{ value: undefined, disabled: false },
        [Validators.required, CustomValidators.AlphaNumericWhiteSpaceSpecificCharacters, CustomValidators.MaxLength(100)]],
      actors: [
        { value: undefined, disabled: false }, [Validators.required, CustomValidators.AlphaNumericWhiteSpaceSpecificCharacters]],
      director: [{ value: undefined, disabled: false },
        [Validators.required, CustomValidators.AlphaNumericWithWhiteSpace, CustomValidators.MaxLength(100)]],
      rentalCost: [{ value: undefined, disabled: false },
        [Validators.required, CustomValidators.Numeric]],
      quantity: [{ value: undefined, disabled: false },
        [Validators.required, CustomValidators.Numeric]],
    });
    return form;
  }

}

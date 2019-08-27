import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CustomValidators } from '../../../shared/clasess/customValidators';
@Injectable()
export class UsersFormsService {

  constructor(private formBuilder: FormBuilder) { }

  getLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: [{ value: undefined, disabled: false }, [Validators.required, CustomValidators.EnailFormat]],
      password: [
        { value: undefined, disabled: false }, [Validators.required, Validators.nullValidator, CustomValidators.IsNullorEmpty]]
    });
  }

  getCreateForm(): FormGroup {
    const form = this.formBuilder.group({
      rol: [{ value: undefined, disabled: false }, [Validators.required, CustomValidators.IsNullorEmpty]],
      name: [{ value: undefined, disabled: false },
        [Validators.required, CustomValidators.AlphaNumericWithWhiteSpace, CustomValidators.MaxLength(100)]],
      email: [{ value: undefined, disabled: false }, [Validators.required, CustomValidators.EnailFormat]],
      password: [
        { value: undefined, disabled: false }, [Validators.required, Validators.nullValidator, CustomValidators.IsNullorEmpty]]
    });
    return form;
  }

}

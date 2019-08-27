import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { isNumber } from 'util';

export class CustomValidators {
  static birthDayAdult: any;
  static PasswordMustHaveNumbers(control: AbstractControl) {
    if (this.hasNumber(control.value)) {
      return null;
    }
    return {
      passwordMustHaveNumbers: 'Password without numbers are not allowed'
    };
  }

  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ matchPassword: true });

    } else {
      return null;
    }
  }

  private static hasNumber(myString) {
    return /\d/.test(myString);
  }

  static AlphaNumericWithWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]*/g, ''));
      return null;
    }
  }

  static AlphaNumericWithOutWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]*/g, ''));
      return null;
    }
  }

  static AlphaWithWhiteSpace(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ ]*/g, ''));
      return null;
    }
  }

  static Numeric(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((/[^0-9]/.test(control.value))) {
      control.setValue(control.value.replace(/[^0-9]*/g, ''));
      return null;
    }
  }

  static MaxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;
      if (length > maxLength) {
        control.setValue(control.value.slice(0, maxLength));
      }
      return null;
    };
  }

  static ToUpperCase(control: AbstractControl) {
    if (control.value && (/[a-zñáéíóú]/.test(control.value))) {
      control.setValue(control.value.toUpperCase());
    }
    return null;
  }

  static Percentage(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if ((/^[0-9]{1,5}\.[0-9]{1,5}/.test(control.value))) {
      return null;
    }
  }

  static PercentageBetween1to100(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^100$|^[0-9]{1,2}$|^[0-9]{1,2}\.[0-9]{1,3}$/.test(control.value))) {
      return { requiredPercentage: true };
    }
    if (control.value === '0') {
      return { requiredPercentage: true };
    }
  }

  static IsNullorEmpty(control: AbstractControl) {
    if (
      control.value === null ||
      control.value === undefined ||
      control.value === 'undefined' ||
      control.value === ''
    ) {
        return { required: true };
    } else {
      return null;
    }
  }

  static DaysofYear(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^(?:36[0-5]|3[0-5]\d|[12]\d{2}|[1-9]+(\.\d{1,2})?)$/.test(control.value))) {
      return { requiredDayofYear: true};
    }
    if (control.value === '0') {
      return { requiredDayofYear: true};
    }
  }

  static AlphaNumericWhiteSpaceSpecificCharacters(control: AbstractControl) {
    if ((/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\.\,\;\-\/\%\(\)\' ]/.test(control.value))) {
      control.setValue(control.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\.\,\;\-\/\%\(\)\' ]*/g, ''));
      return null;
    }
  }

  static EnailFormat(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/(([^<>()[\]\.,;:\s@\']+(\.[^<>()[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/
      .test(control.value))) {
     return { requiredEmailFormat: true };
    }
  }

  static PercentageBetween0to100(control: AbstractControl) {
    if (control.value === null || control.value === undefined || control.value === '') {
      return null;
    }
    if (!(/^100$|^[0-9]{1,2}$|^[0-9]{1,2}\.[0-9]{1,3}$/.test(control.value))) {
      return { requiredPercentage: true };
    }
  }

}

import { FormControl, ValidationErrors } from '@angular/forms';

export const noWhitespaceValidator = (control: FormControl): ValidationErrors => {
    return (control.value || '').trim().length ? {} : { whitespace: true };
};

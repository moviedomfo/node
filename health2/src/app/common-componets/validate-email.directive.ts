import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl ,ReactiveFormsModule,FormsModule,FormGroup} from '@angular/forms';


// validation function
function validateEmailFactory() : ValidatorFn {
let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  return (c: FormControl) => {
    

    return EMAIL_REGEXP.test(c.value) ? null : {
              validateEmail: {
                valid: false
              }
            };

            // if (isValid) {  
            //     return null;  
            //    } else {  
            //     return {  
            //      emailvalidator: {  
            //       valid: false  
            //      }  
            //     };  

  }
}

@Directive({
    selector: '[emailvalidator][ngModel]',
    providers: [
      //{ provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true }
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
    ]
  })
export class EmailValidator implements Validator {
    validator: ValidatorFn;
    
    constructor() {
      this.validator = validateEmailFactory();
    }
    
    validate(c: FormControl) {
      return this.validator(c);
    }
    
  }
// import { Directive, forwardRef } from '@angular/core';
// import { NG_VALIDATORS, FormControl } from '@angular/forms';

// function validateEmailFactory(emailBlackList: EmailBlackList) {
//   return (c: FormControl) => {
//     let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
//     return EMAIL_REGEXP.test(c.value) ? null : {
//       validateEmail: {
//         valid: false
//       }
//     };
//   };
// }

// @Directive({
//   selector: '[validateEmail][ngModel],[validateEmail][formControl]',
//   providers: [
//     { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
//   ]
// })
// export class EmailValidator {

//   validator: Function;

//   constructor(emailBlackList: EmailBlackList) {
//     this.validator = validateEmailFactory(emailBlackList);
//   }

//   validate(c: FormControl) {
//     return this.validator(c);
//   }
// }
import {Validator, AbstractControl, ValidationErrors, NG_VALIDATORS} from '@angular/forms'
import { Directive, Input } from '@angular/core';
@Directive({
    selector: '[ConfirmValidator]',
    providers: [{
        provide:NG_VALIDATORS,
        useExisting: SignUpValidator,
        multi:true
    }]
})
export class SignUpValidator implements Validator{

    @Input() ConfirmValidator:string;
    validate(control: AbstractControl): {[key:string]:any} | null {
        const controlToCompare = control.parent.get(this.ConfirmValidator)
        if(controlToCompare && controlToCompare.value!= control.value){
            return {'notEqual':true}
        }
        return null
    }
}
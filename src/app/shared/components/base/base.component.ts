import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { utilsBr } from 'js-brasil';
import { ToastrService } from "ngx-toastr";
import { fromEvent, merge, Observable } from "rxjs";
import { SuccessMessages } from "../../models/success-messages";

import { DisplayMessage, GenericValidator, ValidationMessages } from "../../validations/generic-form.validation";

export abstract class BaseComponent {
    form: FormGroup;
    errors: any[] = [];

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};

    MASKS = utilsBr.MASKS;

    changesNotSaves: boolean;

    constructor(
        protected toastr: ToastrService,
        protected router: Router
    ) {}

    protected configMessagesValidation(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected configValidation(
        inputsElements: ElementRef[]
    ) {
        let blurObservable: Observable<any>[] = 
            inputsElements.map((element: ElementRef) => fromEvent(element.nativeElement, 'blur'));

        merge(...blurObservable).subscribe(() => this.validarForm());
    }

    protected validarForm() {
        this.displayMessage = this.genericValidator.processarMensagens(this.form);
        this.changesNotSaves = true;
    }

    processSuccess(message: SuccessMessages, navigation: string) {
        this.form.reset();
        this.errors = [];

        let toast = this.toastr.success(message.message, message.title);

        if(toast) toast.onHidden.subscribe(() => this.router.navigate([navigation]));
    }

    processFail(fail: any){
        this.errors = fail.error.errors;
        this.toastr.error('Ocorreu um erro!', 'Falha');
    }
}
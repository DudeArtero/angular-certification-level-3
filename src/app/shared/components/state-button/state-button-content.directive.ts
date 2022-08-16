import { Directive, Input, TemplateRef } from '@angular/core';
import { StateButtonState } from './state-button.model';

@Directive({
    selector: '[stateButtonContent]'
})
export class StateButtonContentDirective {

    @Input() state: StateButtonState = StateButtonState.IDLE;

    constructor(public template: TemplateRef<any>) { }

}
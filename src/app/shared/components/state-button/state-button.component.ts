import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { delay, first, Observable, Subject, takeUntil, tap } from 'rxjs';
import { StateButtonContentDirective } from './state-button-content.directive';
import { StateButtonState, StateButtonType } from './state-button.model';

@Component({
    selector: 'state-button',
    templateUrl: './state-button.component.html',
    styleUrls: ['./state-button.component.scss']
})
export class StateButtonComponent implements AfterContentInit, OnDestroy, OnChanges {

    @HostBinding("class.--disabled") disabled: boolean = false;

    @ContentChildren(StateButtonContentDirective) stateTemplates!: QueryList<StateButtonContentDirective>;

    @Input() type: StateButtonType = StateButtonType.SUBMIT;
    @Input() observe!: Observable<any>;

    @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

    currentTemplate!: TemplateRef<any> | null;
    #unsubscribeTrigger$ = new Subject();

    constructor() { }

    ngOnDestroy(): void {
        this.#unsubscribeTrigger$.next(null);
        this.#unsubscribeTrigger$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.currentTemplate = this.#getTemplateByState(StateButtonState.LOADING);

        if (this.observe) {
            this.disabled = true;

            this.observe.pipe(
                takeUntil(this.#unsubscribeTrigger$),
                tap(x => console.log("Retrieving data...")),
                first()
            ).subscribe({
                next: (data) => {
                    this.currentTemplate = this.#getTemplateByState(StateButtonState.DONE);
                    this.#resetState();

                    this.onComplete.emit(data);
                },
                error: (error) => {
                    this.#resetState();
                }
            });
        }
    }

    ngAfterContentInit(): void {
        this.currentTemplate = this.#getTemplateByState(StateButtonState.IDLE);
    }

    #resetState() {
        setTimeout(() => {
            this.currentTemplate = this.#getTemplateByState(StateButtonState.IDLE);
            this.disabled = false;
        }, 500);
    }

    #getTemplateByState(state: StateButtonState): TemplateRef<any> | null {
        return this.currentTemplate = this.stateTemplates?.find(item => item.state === state)?.template ?? null;
    }
}

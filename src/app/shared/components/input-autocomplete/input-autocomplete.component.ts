import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DropdownItem } from './input-autocomplete.model';

@Component({
    selector: 'input-autocomplete',
    templateUrl: './input-autocomplete.component.html',
    styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements ControlValueAccessor {

    @Input() 
    set items(value: DropdownItem[]) {
        this.#items = value;
        this.filteredItems = this.#items;
    }
    #items: DropdownItem[] = [];

    @Input() value!: DropdownItem;
    @Input() placeholder: string = "Search a country...";

    @Output() onSelect: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

    showPredictiveOptions: boolean = true;
    filteredItems: DropdownItem[] = [];

    #onTouch: () => void = () => {};
    #onChange: (_: any) => void = () => {};

    constructor(@Optional() @Self() public ngControl: NgControl) { 
        if (!ngControl) return;
        ngControl.valueAccessor = this;
    }

    onInput(value: string) {
        this.filteredItems = this.#items.filter(item => item.id.toLowerCase().includes(value.toLowerCase()) || item.label.toLowerCase().includes(value.toLowerCase()));
        this.#onTouch();
    }

    onSelectItem(item: DropdownItem) {
        this.value = item;

        this.#onTouch();
        this.#onChange(this.value);
        this.onSelect.emit(item);
    }

    writeValue(value: DropdownItem): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.#onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.#onTouch = fn;
    }
}

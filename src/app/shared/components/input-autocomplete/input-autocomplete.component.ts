import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DropdownItem } from './input-autocomplete.model';

@Component({
    selector: 'input-autocomplete',
    templateUrl: './input-autocomplete.component.html',
    styleUrls: ['./input-autocomplete.component.scss'],
    host: {
        "(mouseover)": "this.showPredictiveOptions = true",
        "(mouseleave)": "this.showPredictiveOptions = false"
    }
})
export class InputAutocompleteComponent implements ControlValueAccessor {

    // Items shown in the overlay 
    @Input() 
    set items(value: DropdownItem[]) {
        this.#items = value;
        this.filteredItems = this.#items;
    }
    #items: DropdownItem[] = [];

    // Selected value of the overlay
    @Input() value!: DropdownItem | null;
    @Input() placeholder: string = "Search a country...";

    @Output() onSelect: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

    showPredictiveOptions: boolean = false;
    filteredItems: DropdownItem[] = [];
    filter: string = "";

    #onTouch: () => void = () => {};
    #onChange: (_: any) => void = () => {};

    constructor(@Optional() @Self() public ngControl: NgControl) { 
        if (!ngControl) return;
        ngControl.valueAccessor = this;
    }

    /**
     * Filter the items of the original item array with the specified value
     * @param value String filter value
     */
    onInput(value: string) {
        this.filteredItems = this.#items.filter(item => item.id.toLowerCase().includes(value.toLowerCase()) || item.label.toLowerCase().includes(value.toLowerCase()));
        this.filter = value;
        this.#onTouch();
    }

    /**
     * Selects the clicked item and emits the value
     * @param item Selected item
     */
    onSelectItem(item: DropdownItem) {
        this.value = item;
        this.filteredItems = this.#items;
        this.filter = "";
        this.showPredictiveOptions = false;

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

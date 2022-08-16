import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputAutocompleteComponent } from "./components/input-autocomplete/input-autocomplete.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { StateButtonContentDirective } from "./components/state-button/state-button-content.directive";
import { StateButtonComponent } from "./components/state-button/state-button.component";
import { BoldFilterPipe } from "./pipes/bold-filter.pipe";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent,
        StateButtonComponent,
        InputAutocompleteComponent,
        StateButtonContentDirective,
        BoldFilterPipe
    ],
    exports: [
        SpinnerComponent,
        StateButtonComponent,
        InputAutocompleteComponent,
        StateButtonContentDirective
    ]
})
export class SharedModule { }

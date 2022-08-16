import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns an HTML code with the part of the filter which matchs with the label of the value inside <strong> tag
 */
@Pipe({ name: 'boldFilter' })
export class BoldFilterPipe implements PipeTransform {

    transform(value: string, filter: string): string {
        const indexFilter: number = value.toLowerCase().indexOf(filter.toLowerCase());
        let startValue: string = value.substring(0, indexFilter);
        let boldValue: string = value.substring(indexFilter, indexFilter + filter.length);
        let endValue: string = value.substring(indexFilter + filter.length, value.length);

        return `${startValue}<strong>${boldValue}</strong>${endValue}`;
    }

}
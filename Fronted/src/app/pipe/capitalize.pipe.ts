import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToTitleCase'
})
export class CamelCaseToTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Insert a space before all uppercase letters and capitalize the first letter
    const result = value.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
      return str.toUpperCase();
    });

    return result;
  }
}

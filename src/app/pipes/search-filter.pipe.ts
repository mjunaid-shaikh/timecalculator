import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(timeZones: any[], searchText: string): any[] {
    if (!timeZones) return [];
    if (!searchText) return timeZones;
    console.log('searText', searchText);
    searchText = searchText.toLowerCase();

    return timeZones.filter((timeZone) =>
      timeZone.country.toLowerCase().includes(searchText)
    );
  }
}

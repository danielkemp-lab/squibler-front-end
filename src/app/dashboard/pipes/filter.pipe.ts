import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterNotes',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, searchText: string): Array<any> {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter(it => it.title.toLowerCase()
      .includes(searchText));
  }
}

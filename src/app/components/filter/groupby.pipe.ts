import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'groupBy',
  // pure: false
})
export class GroupbyPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur) => {
      (prev[cur[field]] = prev[cur[field]] || []).push(cur);
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({key, value: groupedObj[key]}));
  }
}

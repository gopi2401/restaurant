import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrders',
  standalone: true
})
export class FilterOrdersPipe implements PipeTransform {

  transform(value: any, args: { pending: boolean, delivered: boolean }): any {
    if (args.pending && !args.delivered) { return value.filter((item: any) => (item.status === 'pending')); } else
      if (args.delivered && !args.pending) { return value.filter((item: any) => (item.status === 'delivered')); }
      else {
        return value;
      }
  }

}

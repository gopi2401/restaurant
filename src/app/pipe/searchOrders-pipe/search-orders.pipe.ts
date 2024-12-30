import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOrders',
  standalone: true
})
export class SearchOrdersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      // console.log(value, args.match(args))
      // const id = args.match('#') ? value.id.match(args.replace('#', '')) : value.id.match(args);
      let id = false
      // if (args.match('#')) {
      //   let v = value.id.toString()
      //   let rgex = RegExp(`/${v}/g`)
      //   console.log(args.replace('#', ''))
      //   console.log(rgex, rgex.test('         1'))
      // } else {

      // }
      return (value.customer_name.match(args) || (value.price.match(args)));
    })
  }

}

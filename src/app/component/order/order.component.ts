import { Component, OnInit } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { OrderService } from '../../service/order-service/order.service';
import { OrderFormService } from '../../service/order-form-service/order-form.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  Orders: any

  constructor(private orderService: OrderService, private orderFormService: OrderFormService

  ) { }

  ngOnInit(): void {
    this.orderService.GetOrderAndItem().subscribe(data => {
      console.log(data.data)
      this.Orders = data.data;
      // let prodect = ''
      // this.Orders.forEach(element => {
      // console.log(element.order_items)
      //   if (element) {
      //     element.order_items.map(e => {
      //       prodect += e?.name + ","
      //     })
      //   }
      // });
      // console.log(prodect)
    })
  }

  openModal() {
    this.orderFormService
      .open()
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

}

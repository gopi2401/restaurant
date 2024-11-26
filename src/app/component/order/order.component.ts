import { Component } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  items = [
    {
      title: "a",
      product: "string",
      quantity: 2,
      price: 88,
      status: "pending"
    }, {
      title: "b",
      product: "string",
      quantity: 1,
      price: 882,
      status: "delivered"
    },
    {
      title: "b",
      product: "string",
      quantity: 1,
      price: 882,
      status: "delivered"
    }, {
      title: "b",
      product: "string",
      quantity: 1,
      price: 882,
      status: "delivered"
    }
  ]
}

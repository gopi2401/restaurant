import { Component, OnInit } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { OrderService } from '../../service/order-service/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  Orderitems: any

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.GetOrders().subscribe(data => {
      this.Orderitems = data.data;
    })
  }

}

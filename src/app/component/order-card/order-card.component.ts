import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderService } from '../../service/order-service/order.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  @Input() id
  @Input() title = '';
  @Input() product = '';
  @Input() quantity = 1;
  @Input() price = 0;
  @Input() status = "pending";

  @Output() OrderData = new EventEmitter<any>()

  constructor(private orderService: OrderService) { }

  Delivered(id: number) {
    this.orderService.orderUpdate(id, { status: 'delivered' }).subscribe(data => {
      console.log(data);
      if (data.message === "Order updated successfully") {
        var index = this.orderService.orderDataItems.findIndex((item) => item.id === id);
        const data = this.orderService.orderDataItems[index];
        data.status = 'delivered';
        if (index !== -1) { this.orderService.orderDataItems[index] = data; };
      }
    })
  }
}

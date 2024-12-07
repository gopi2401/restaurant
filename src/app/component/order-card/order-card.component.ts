import { Component, Input } from '@angular/core';
import { OrderService } from '../../service/order-service/order.service';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
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
  constructor(private orderService: OrderService) { }
  Delivered(id: number) {
    this.orderService.orderUpdate(id, { status: 'delivered' }).subscribe(data => {
      console.log(data)
    })
  }
}

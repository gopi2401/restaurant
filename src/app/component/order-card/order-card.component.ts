import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {

  @Input() title = '';
  @Input() product = '';
  @Input() quantity = 1;
  @Input() price = 0;
  @Input() status = "pending";

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { OrderService } from '../../service/order-service/order.service';
import { OrderFormService } from '../../service/order-form-service/order-form.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { SearchOrdersPipe } from "../../pipe/searchOrders-pipe/search-orders.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent, NgbDropdownModule, NgClass, FormsModule, SearchOrdersPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  Orders: any[] = []
  table: boolean = false;
  searchString = '';

  filter: OrderFilter = {
    pending: true,
    delivered: false
  }
  constructor(private orderService: OrderService, private orderFormService: OrderFormService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.orderService.getOrderData.subscribe(data => {
      this.Orders = data;
    });
  }

  ngOnInit(): void {
    this.orderService.GetOrderAndItem().subscribe(data => {
      this.orderService.setOrderDataItems(data.data);
      this.filterFn()
    });
  };

  orderDataReceive(data: any) {
    console.log(data)
    // var index = this.menuService.getMenu.findIndex((item) => item.id === data.id);
    // if (index !== -1) { this.menuService.getMenu[index] = data; };
  }

  filterFn() {
    let values = this.orderService.orderDataItems;
    if (this.filter.pending && !this.filter.delivered) { this.Orders = values.filter((item: any) => (item.status === 'pending')); } else
      if (this.filter.delivered && !this.filter.pending) { this.Orders = values.filter((item: any) => (item.status === 'delivered')); }
      else {
        this.Orders = this.orderService.orderDataItems;
      }
  }

  iterateProduct(data: any) {
    let product = '';
    if (data[0]) {
      data.map((e: any) => {
        product += e.menu_name + ","
      });
      return product;
    }
    return product
  };

  openModal() {
    this.orderFormService
      .open()
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

  showTable() {
    this.table = !this.table;
  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }

}

interface OrderFilter {
  pending: boolean
  delivered: boolean
}
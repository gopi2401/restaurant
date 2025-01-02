import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderCardComponent } from "../order-card/order-card.component";
import { OrderService } from '../../service/order-service/order.service';
import { OrderFormService } from '../../service/order-form-service/order-form.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { SearchOrdersPipe } from "../../pipe/searchOrders-pipe/search-orders.pipe";
import { FormsModule } from '@angular/forms';
import { FilterOrdersPipe } from "../../pipe/filterOrders-pipe/filter-orders.pipe";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderCardComponent, NgbDropdownModule, NgClass, FormsModule, SearchOrdersPipe, FilterOrdersPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  Orders: any[] = []
  table: boolean = false;
  searchString = '';
  filterpending: boolean = true
  filterdelivered: boolean = false

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
    });
  };

  orderDataReceive(data: any) {
    console.log(data)
    // var index = this.menuService.getMenu.findIndex((item) => item.id === data.id);
    // if (index !== -1) { this.menuService.getMenu[index] = data; };
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
    this.changeDetectorRef.detectChanges();
  }

}

interface OrderFilter {
  pending: boolean
  delivered: boolean
}
import { Component, TemplateRef } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { NotificationComponent } from "../notification/notification.component";
import { Title } from '@angular/platform-browser';
import { OrderFormService } from '../../service/order-form-service/order-form.service';
import { DashboardService } from '../../service/dashboard-service/dashboard.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalOrder: number
  totalQuantity: number
  totalPrice: number
  constructor(private title: Title, private orderFormService: OrderFormService, private dashboardService: DashboardService, private appComponent: AppComponent) {
    appComponent.isLogin = false;
    this.title.setTitle('Dashboard-Restaurant');
    this.dashboardService.getOrderCount().subscribe(data => {
      this.totalOrder = data.data.orderCount;
    });
    this.dashboardService.getOrderQuantity().subscribe(data => {
      this.totalQuantity = data.data.orderQuantity
    })
    this.dashboardService.getOrderPrice().subscribe(data => {
      this.totalPrice = data.data.orderPrice
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

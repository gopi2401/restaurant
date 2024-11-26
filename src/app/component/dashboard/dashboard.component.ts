import { Component, TemplateRef } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { NotificationComponent } from "../notification/notification.component";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AddOrderComponent } from "../add-order/add-order.component";
import { AddOrderService } from '../add-order/add-order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBarComponent, NotificationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private title: Title, private addOrderService: AddOrderService) {
    this.title.setTitle('Dashboard-Restaurant');
  }
  addOrder() {
  }
  openModal() {
    this.addOrderService
      .open()
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

}

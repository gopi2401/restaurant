import { Component, TemplateRef } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { NotificationComponent } from "../notification/notification.component";
import { Title } from '@angular/platform-browser';
import { OrderFormService } from '../../service/order-form-service/order-form.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NotificationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private title: Title, private orderFormService: OrderFormService) {
    this.title.setTitle('Dashboard-Restaurant');
  }

  openModal() {
    this.orderFormService
      .open()
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

}

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login-service/login.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, NgIf],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public sidebarShow: boolean = false;
  constructor(private loginService: LoginService) { }

  navItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'bx bx-home' },
    { label: 'Orders', link: '/orders', icon: 'bx bx-cart' },
    { label: 'Menu', link: '/menus', icon: 'bx bx-drink' },
    { label: 'Expenses', link: '/expenses', icon: 'bx bx-shopping-bag' },
    { label: 'Chart', link: '/chart', icon: 'bx bx-chart' },
    { label: 'Profile', link: '#', icon: 'bx bx-user' },
    { label: 'Notifications', link: '#', icon: 'bx bx-bell', notification: 5 },
    {
      label: 'Logout',
      icon: 'bx bx-log-out',
      action: () => this.logout()
    }
  ];
  

  logout() {
    this.loginService.logout()
  }
}

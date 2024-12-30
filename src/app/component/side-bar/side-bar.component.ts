import { NgClass } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../service/login-service/login.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  public sidebarShow: boolean = false;
  constructor(private loginService: LoginService) { }

  logout() {
    this.loginService.logout()
  }
}

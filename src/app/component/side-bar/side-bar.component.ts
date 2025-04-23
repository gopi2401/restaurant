import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login-service/login.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
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

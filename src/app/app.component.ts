import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./component/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isLogin = false;

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) {
    // if (!localStorage.getItem('accessToken') && !localStorage.getItem('user')) {
    //   this.isLogin = true
    // }
  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }
}

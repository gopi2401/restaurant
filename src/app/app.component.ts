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
export class AppComponent implements OnInit {
  isLoginPage = false;

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = ['/login'].includes(event.url);
        this.changeDetect()
      }
    });
  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }
}

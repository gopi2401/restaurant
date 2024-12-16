import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu-service/menu.service';
import { MenuFormService } from '../../service/menu-form-service/menu-form.service';
import { ConfirmAlertComponent } from "../confirm-alert/confirm-alert/confirm-alert.component";
import { MenuFormComponent } from "../menu-form/menu-form.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ConfirmAlertComponent, MenuFormComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  menusData: any[] = [];
  ConfirmAlert: boolean = false;
  editModel: boolean = false;
  editData: { id: number, name: string, price: number, pic_url: string };
  deleteId: number;

  constructor(public menuService: MenuService, private menuFormService: MenuFormService, private changeDetectorRef: ChangeDetectorRef) {
    this.menuService.getMenusData.subscribe(data => this.menusData = data);
  }

  ngOnInit() {
    this.menuService.getmenus().subscribe(data => {
      this.menuService.setMenuData(data.data);
    })
  }

  menuDataReceive(data: any) {
    var index = this.menuService.getMenu.findIndex((item) => item.id === data.id);
    if (index !== -1) { this.menuService.getMenu[index] = data; };
  }

  openMenuModal() {
    this.menuFormService
      .open()
      .subscribe((action) => {
      });
  }

  deleteMenu() {
    this.menuService.deletemenu(this.deleteId).subscribe(data => {
      this.deleteId = null
      this.ConfirmAlert = false;
    })
  };

  public deleteModal() {
    this.ConfirmAlert = !this.ConfirmAlert
  }

  public editModal() {
    this.editModel = !this.editModel
  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }
}

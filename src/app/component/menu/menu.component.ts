import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu-service/menu.service';
import { MenuFormService } from '../../service/menu-form-service/menu-form.service';
import { ConfirmAlertComponent } from "../confirm-alert/confirm-alert/confirm-alert.component";
import { MenuFormComponent } from "../menu-form/menu-form.component";
import { TestComponent } from "../test/test/test.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ConfirmAlertComponent, MenuFormComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  ConfirmAlert: boolean = false;
  editModel: boolean = false;
  editData: { id: number, name: string, price: number, pic_url: string };
  deleteId: number;
  menusData: any[];
  exampleParent: string
  constructor(private menuService: MenuService, private menuFormService: MenuFormService) { }

  ngOnInit() {
    this.menuService.getmenus().subscribe((data) => {
      console.log(data.message)
      this.menusData = data.data;
    })
  }
  exampleMethodParent($event) {
    this.exampleParent = $event;
  }
  openModal() {
    this.menuFormService
      .open()
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }
  deleteMenu() {
    this.menuFormService.deletemenu(this.deleteId).subscribe(data => {
      console.log(data);
      this.ConfirmAlert = false;
    })
  };

  public deleteModal() {
    this.ConfirmAlert = !this.ConfirmAlert
  }

  public editModal() {
    this.editModel = !this.editModel
  }
}

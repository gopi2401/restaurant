import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderFormService } from '../../../service/order-form-service/order-form.service';
import { MenuService } from '../../../service/menu-service/menu.service';
import { OrderService } from '../../../service/order-service/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  menuItems: Array<{ id: number, name: string, price: number, pic_url: string }> = []
  menu: any;
  constructor(private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private orderFormService: OrderFormService,
    private orderService: OrderService,
    private menuService: MenuService
  ) {
    this.menuService.getmenus().subscribe(data => {
      this.menuItems = data.data
      this.changeDetect();
    })
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.orderFG.controls.price.setValue(this.orderAmount);
    this.orderFG.controls.quantity.setValue(this.orderQuantity)
    console.log(this.orderFG.value)
    let order: any = this.orderFG.value
    this.orderService.createOrder(this.orderFG.value).subscribe(data => {
      console.log(data)
      if (data) {
        order.id = data.data
        this.orderService.setOrderDataItems([...this.orderService.orderDataItems, order])
      }
    })
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }

  MenuFA = new FormArray([this.newMenuFG]);

  orderFG = new FormGroup({
    customer_name: new FormControl(null),
    menus: this.MenuFA,
    quantity: new FormControl(this.orderQuantity),
    price: new FormControl(this.orderAmount)
  });

  get menuArrayFGControls(): FormGroup[] {
    return this.MenuFA.controls as FormGroup[];
  }

  get newMenuFG(): FormGroup {
    return new FormGroup({
      menu_id: new FormControl(null),
      menu_name: new FormControl(null),
      menu_price: new FormControl(null),
      menu_quantity: new FormControl(null),
    });
  }

  get orderAmount() {
    return this.MenuFA.controls.reduce((pre, cur) => (pre + cur.controls['menu_price'].value * cur.controls['menu_quantity'].value), 0);
  }
  get orderQuantity() {
    return this.MenuFA.controls.reduce((pre, cur) => (pre + cur.controls['menu_quantity'].value), 0);
  }

  addMenuFG(): void {
    this.MenuFA.push(this.newMenuFG);
    this.changeDetect()
  }

  removeMenuFG(index: number): void {
    this.MenuFA.removeAt(index);
    this.changeDetect()
  }

  selectedMenu(id: any, index: number) {
    const menu = this.menuItems.find((item) => (item.id == id));
    console.log(menu)
    this.MenuFA.controls.at(index).controls['menu_id'].setValue(menu.id);
    this.MenuFA.controls.at(index).controls['menu_name'].setValue(menu.name);
    this.MenuFA.controls.at(index).controls['menu_price'].setValue(menu.price);
    this.MenuFA.controls.at(index).controls['menu_quantity'].setValue(1);
    this.changeDetect()
  }

  quantityChange(change: number, index: number) {
    const value = this.MenuFA.controls.at(index).controls['menu_quantity'].value
    if (change + value > 0) {
      this.MenuFA.controls.at(index).controls['menu_quantity'].setValue(change + parseInt(value));
      this.changeDetect()
    }
  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }
}

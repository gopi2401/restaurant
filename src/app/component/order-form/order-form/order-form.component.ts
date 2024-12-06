import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderFormService } from '../../../service/order-form-service/order-form.service';
import { MenuService } from '../../../service/menu-service/menu.service';

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
    console.log(this.orderFG.value)
    // this.orderFormService.createOrder()
    // this.elementRef.nativeElement.remove();
    // this.submitEvent.emit();
  }
  MenuFA = new FormArray([this.newMenuFG]);


  orderFG = new FormGroup({
    customer_name: new FormControl(null),
    menus: this.MenuFA,
    quantity: new FormControl(1),
    price: new FormControl(0)
  });

  get menuArrayFGControls(): FormGroup[] {
    return this.MenuFA.controls as FormGroup[];
  }

  get newMenuFG(): FormGroup {
    return new FormGroup({
      menu_id: null,
      menu_name: new FormControl(null),
      menu_price: null,
      menu_quantity: new FormControl(1),
    });
  }

  addMenuFG(): void {
    this.MenuFA.push(this.newMenuFG);
    this.changeDetect()
  }

  removeMenuFG(index: number): void {
    this.MenuFA.removeAt(index);
    this.changeDetect()
  }
  
  selectedMenu(ss: any) {
    console.log(ss)
    this.menu = ss;
  }

  quantityChange(change: number, index: number) {
    const value = this.MenuFA.controls.at(index).controls['quantity'].value
    if (change + value > 0) { this.MenuFA.controls.at(index).controls['quantity'].setValue(change + parseInt(value)); }
  }

  changeDetect() {
    this.changeDetectorRef.detectChanges()
  }
}

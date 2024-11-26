import { NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent {
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
  MenuFA = new FormArray([this.newMenuFG]);


  orderFG = new FormGroup({
    menus: this.MenuFA
  });

  get menuArrayFGControls(): FormGroup[] {
    return this.MenuFA.controls as FormGroup[];
  }

  addMenuFG(): void {
    console.log(this.MenuFA)
    this.MenuFA.push(this.newMenuFG);
  }
  get newMenuFG(): FormGroup {
    return new FormGroup({
      name: new FormControl(null),
      quantity: new FormControl(null),
    });
  }
  removeMenuFG(index: number): void {
    this.MenuFA.removeAt(index);
  }

}

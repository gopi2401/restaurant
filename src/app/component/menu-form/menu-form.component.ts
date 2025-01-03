import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuFormService } from '../../service/menu-form-service/menu-form.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { FieldErrorDisplayComponent } from "../field-error-display/field-error-display.component";
@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FieldErrorDisplayComponent, NgClass],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.scss'
})
export class MenuFormComponent implements OnInit {
  menuFG: FormGroup;
  @Input() data: { id: number, name: string, price: number, pic_url: string }
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Output() exampleOutput = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, private menuFormService: MenuFormService) { }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }
  exampleMethodChild() {
    this.exampleOutput.emit('qwertyuiop')
  }
  submit(): void {
    this.menuFG.markAllAsTouched();
    if (this.menuFG.valid) {
      this.elementRef.nativeElement.remove();
      this.submitEvent.emit();
      console.log('Form is valid');
      console.log(this.menuFG.getRawValue());
      let menu = this.menuFG.value
      if (this.data.id) {
        this.menuFormService.editmenu(this.data.id, menu).subscribe(data => {
          console.log(data)
        });
      } else {
        this.menuFormService.createmenu(menu).subscribe(data => {
          console.log(data)
        })
      };
    } else {
      console.log('Form is not valid');
      this.validateAllFormFields(this.menuFG);
    }
  };

  ngOnInit(): void {
    console.log('menuform ngOnInit', this.data)
    this.menuFG = this.formBuilder.group({
      name: new FormControl(this.data?.name || null, Validators.required),
      price: new FormControl(this.data?.price || null, Validators.required),
      pic_url: new FormControl(this.data?.pic_url || null, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g))
    });
  }

  isFieldValid(field: string) {
    console.log('ssd', this.menuFG.get('name').valid)
    console.log('ssd', this.menuFG.get(field).dirty)
    console.log('isFieldValid',)
    return !(this.menuFG.get(field).valid && this.menuFG.get(field).dirty);
  };

  displayFieldCss(field: string) {
    console.log('displayFieldCss')
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  };

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}

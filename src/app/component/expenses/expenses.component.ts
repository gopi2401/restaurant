import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../service/expense-service/expense.service';
import { ConfirmAlertComponent } from "../confirm-alert/confirm-alert/confirm-alert.component";
import { MenuFormComponent } from "../menu-form/menu-form.component";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, ConfirmAlertComponent, MenuFormComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  ExpensesData: any[] = [];
  deleteId: any

  ConfirmAlert = false;
  modalVisible = false;
  expenseFG: FormGroup;

  constructor(private changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder, private expenseService: ExpenseService) {
    this.expenseService.getExpense().subscribe(data => {
      this.ExpensesData = data.data
    })
  }
  product = {
    title: '',
    name: '',
    category: '',
    amount: ''
  };



  openAddProductModal() {
    this.expenseFG = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      category: new FormControl(null),
      pic_url: new FormControl(null, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g))
    });
    this.product = { title: 'Add Product', name: '', category: '', amount: '' };
    this.modalVisible = true;
  }

  openEditProductModal(data: any) {
    this.expenseFG = this.formBuilder.group({
      id: new FormControl(data.id),
      name: new FormControl(data.name, Validators.required),
      price: new FormControl(data.price, Validators.required),
      category: new FormControl(data.category),
      pic_url: new FormControl(data.pic_url, Validators.pattern(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g))
    });
    this.product = { title: 'Edit Product', name: '', category: '', amount: '' };
    this.modalVisible = true;
  }

  deleteModal() {
    this.ConfirmAlert = !this.ConfirmAlert
    if (!this.ConfirmAlert) { this.deleteId = null; }
  }

  closeProductModal() {
    this.modalVisible = false;
  }

  submit() {
    if (this.expenseFG.valid) {
      let expense = this.expenseFG.value
      if (this.product.title === 'Add Product') {
        this.expenseService.createExpense(expense).subscribe(data => {
          console.log(data);
          this.modalVisible = false;
        });
      } else if (this.product.title === 'Edit Product') {
        this.expenseService.editExpense(expense.id, expense).subscribe(data => {
          console.log(data);
          this.modalVisible = false;
        })
      }
    } else { }
  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.deleteId).subscribe(data => {
      console.log(data);
      this.deleteModal();
    })
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-alert',
  standalone: true,
  imports: [],
  templateUrl: './confirm-alert.component.html',
  styleUrl: './confirm-alert.component.scss'
})
export class ConfirmAlertComponent {
  @Output() function = new EventEmitter()
  @Output() closefun = new EventEmitter();

}

import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  standalone: true,
  imports: [NgIf],
  templateUrl: './field-error-display.component.html',
  styleUrl: './field-error-display.component.scss'
})
export class FieldErrorDisplayComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean | undefined;
}

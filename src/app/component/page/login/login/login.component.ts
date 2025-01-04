import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

import { LoginService } from '../../../../service/login-service/login.service';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private title: Title, private formBuilder: FormBuilder,
    private LoginService: LoginService,
    private router: Router,
    private appComponent: AppComponent) {
    this.title.setTitle('login-Restaurant');

    if (localStorage.getItem('accessToken') && localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    } else {
      appComponent.isLogin = true;
    }

    this.loginForm = this.formBuilder.group({
      phone: null,
      password: null
    });
  }

  submit() {
    const { phone, password } = this.loginForm.value
    if (phone && password) {
      this.LoginService.loginUser({ phone, password }).subscribe((data) => {
        if (data) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('user', JSON.stringify(data.data));
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}

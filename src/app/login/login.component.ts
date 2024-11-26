import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { LoginService } from '../service/login-service/login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router) {
    this.title.setTitle('login-Restaurant');

    this.loginForm = this.formBuilder.group({
      phone: null,
      password: null
    })
  }

  submit() {
    const { phone, password } = this.loginForm.value
    if (phone && password) {
      this.LoginService.loginUser({ phone, password }).subscribe((data) => {
        if (data) {
          localStorage.setItem('authToken', data.authToken);
          localStorage.setItem('user', data.data);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  getAPIData() {
    this.LoginService.getUserList().subscribe(data => {
      console.log(data)
    })
  }
}

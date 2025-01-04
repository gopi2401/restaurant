import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token = new BehaviorSubject('');
  getTokenFu = this.token.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    const data = localStorage.getItem('accessToken');
    if (data) this.token.next(data);
  }

  loginUser(payload: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/v1/login', payload)
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get getToken() {
    let data
    this.getTokenFu.subscribe(value => {
      data = value;
    })
    return data;
  }

  get getTokenHeader() {
    const token = this.getToken;
    if (!token) this.router.navigate(['/login']);
    const headers = {
      "Authorization": 'Bearer ' + token
    }
    return headers;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<any> {
    return this.httpClient.get('https://run.mocky.io/v3/b1e35d03-805b-41cd-895d-2990ea5e8f0b')

  }

  loginUser(payload: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/v1/login', payload)
  }
}

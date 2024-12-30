import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  headers = this.loginService.getTokenHeader;

  //  private expenData = new BehaviorSubject([])
  //   getMenusData = this.menusData.asObservable();

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getExpense(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/v1/expense', { headers: this.headers });
  };

  createExpense(payload: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/v1/expense', payload, { headers: this.headers });
  }

  editExpense(id: number, payload: any): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:3000/v1/expense/${id}`, payload, { headers: this.headers });
  }

  deleteExpense(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:3000/v1/expense/${id}`, { headers: this.headers });
  }
}

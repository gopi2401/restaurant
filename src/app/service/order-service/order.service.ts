import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderData = new BehaviorSubject([]);
  getOrderData = this.orderData.asObservable();

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  get orderDataItems() {
    let orderData;
    this.getOrderData.subscribe(data => {
      orderData = data;
    });
    return orderData
  }

  setOrderDataItems(data: any) {
    this.orderData.next(data);
  }

  GetOrderAndItem(): Observable<any> {
    const headers = this.loginService.getTokenHeader;
    return this.httpClient.get('http://localhost:3000/v1/orderanditems', { headers })
  }

  createOrder(payload: any): Observable<any> {
    const headers = this.loginService.getTokenHeader;
    return this.httpClient.post<any>("http://localhost:3000/v1/order", payload, { headers });
  }

  orderUpdate(id: number, payload: any): Observable<any> {
    const headers = this.loginService.getTokenHeader;
    return this.httpClient.put<any>(`http://localhost:3000/v1/order/${id}`, payload, { headers });
  }
}
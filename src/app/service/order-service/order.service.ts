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
    const response = this.httpClient.post<any>("http://localhost:3000/v1/order", payload, { headers });
    response.subscribe(data => {
      if (data) {
        payload.id = data.data
        this.setOrderDataItems([payload, ...this.orderDataItems])
      }
    })
    return response;
  }

  orderUpdate(id: number, payload: any): Observable<any> {
    const headers = this.loginService.getTokenHeader;
    const response = this.httpClient.put<any>(`http://localhost:3000/v1/order/${id}`, payload, { headers });
    response.subscribe(data => {
      if (data.message === "Order updated successfully") {
        var index = this.orderDataItems.findIndex((item) => item.id === id);
        const data = this.orderDataItems[index];
        data.status = payload.status;
        if (index !== -1) { this.orderDataItems[index] = data; };
      }
    });
    return response;
  }
}

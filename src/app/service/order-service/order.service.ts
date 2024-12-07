import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  GetOrderAndItem(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/v1/orderanditems')
  }

  orderUpdate(id: number, payload: any): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/v1/order/${id}`, payload)
  }
}

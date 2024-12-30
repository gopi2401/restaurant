import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getOrderCount(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/v1/ordercount')
  }


  getOrderQuantity(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/v1/orderquantity')
  }

  getOrderPrice(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/v1/orderprice')
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menusData: any[];
  constructor(private httpClient: HttpClient) { }

  getmenus(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/v1/menu')
  }

}

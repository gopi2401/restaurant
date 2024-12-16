import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {
  
  private menusData = new BehaviorSubject([])
  getMenusData = this.menusData.asObservable();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getmenus().subscribe(data => {
      this.menusData = data.data;
    })
  }

  get getMenu() {
    let dataMenus: any;
    this.getMenusData.subscribe(data => dataMenus = data);
    return dataMenus;
  }

  setMenuData(newData: any) {
    this.menusData.next(newData)
  }

  getmenus(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/v1/menu');
  }

  deletemenu(id: number): Observable<any> {
    let response = this.httpClient.delete(`http://localhost:3000/v1/menu/${id}`)
    var index = this.getMenu.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.getMenu.splice(index, 1)
    }
    return response;
  };
}

import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuFormComponent } from '../../component/menu-form/menu-form.component';
import { DOCUMENT } from '@angular/common';
import { MenuService } from '../menu-service/menu.service';
import { LoginService } from '../login-service/login.service';

@Injectable({
    providedIn: 'root'
})
export class MenuFormService {
    private modalNotifier?: Subject<string>;
    menuDataReceived: any
    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        private httpClient: HttpClient,
        private menuService: MenuService,
        private loginService: LoginService
    ) { }

    open() {
        const menuFormComponentFactory = this.resolver.resolveComponentFactory(
            MenuFormComponent
        );
        const modalComponent = menuFormComponentFactory.create(this.injector);

        modalComponent.instance.menuDataNew.subscribe((menuData: any) => {
            let data = this.menuService.getMenu
            this.menuService.setMenuData([...data, menuData])
        });
        modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
        modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

        modalComponent.hostView.detectChanges();

        this.document.body.appendChild(modalComponent.location.nativeElement);
        this.modalNotifier = new Subject();
        return this.modalNotifier?.asObservable();
    }

    closeModal() {
        this.modalNotifier?.complete();
    };

    submitModal() {
        this.modalNotifier?.next('confirm');
        this.closeModal();
    };

    getData() {
        return this.menuDataReceived;
    }
    createmenu(payload: any): Observable<any> {
        const headers = this.loginService.getTokenHeader;
        return this.httpClient.post('http://localhost:3000/v1/menu', payload, { headers })
    };

    editmenu(id: number, payload: any): Observable<any> {
        const headers = this.loginService.getTokenHeader;
        return this.httpClient.put(`http://localhost:3000/v1/menu/${id}`, payload, { headers })
    };

}
import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuFormComponent } from '../../component/menu-form/menu-form.component';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class MenuFormService {
    private modalNotifier?: Subject<string>;
    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document,
        private httpClient: HttpClient
    ) { }

    open() {
        const menuFormComponentFactory = this.resolver.resolveComponentFactory(
            MenuFormComponent
        );
        const modalComponent = menuFormComponentFactory.create(this.injector);

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

    createmenu(payload: any): Observable<any> {
        return this.httpClient.post('http://localhost:3000/v1/menu', payload)
    };

    editmenu(id: number, payload: any): Observable<any> {
        return this.httpClient.put(`http://localhost:3000/v1/menu/${id}`, payload)
    };

    deletemenu(id: number): Observable<any> {
        return this.httpClient.delete(`http://localhost:3000/v1/menu/${id}`)
    };
}

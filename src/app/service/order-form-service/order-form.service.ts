import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { OrderFormComponent } from '../../component/order-form/order-form/order-form.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  private modalNotifier?: Subject<string>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) { }

  open() {
    const AddOrderComponentFactory = this.resolver.resolveComponentFactory(
      OrderFormComponent
    );
    const modalComponent = AddOrderComponentFactory.create(this.injector);

    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }

}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { OrderComponent } from './component/order/order.component';
import { MenuComponent } from './component/menu/menu.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
    { path: 'menus', component: MenuComponent, canActivate: [authGuard] },
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { OrderComponent } from './component/order/order.component';
import { MenuComponent } from './component/menu/menu.component';
import { ExpensesComponent } from './component/expenses/expenses.component';
import { LoginComponent } from './component/page/login/login/login.component';
import { ChartComponent } from './component/page/chart/chart/chart.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'menus', component: MenuComponent, canActivate: [AuthGuard] },
    { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard] },
    { path: 'chart', component: ChartComponent, canActivate: [AuthGuard] }
];

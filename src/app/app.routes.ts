import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./component/page/login/login/login.component').then(m => m.LoginComponent) },
    {
        path: '', loadComponent: () => import('./component/side-bar/side-bar.component').then(m => m.SideBarComponent),
        canActivate: [AuthGuard], children: [
            { path: 'dashboard', loadComponent: () => import('./component/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'orders', loadComponent: () => import('./component/order/order.component').then(m => m.OrderComponent) },
            { path: 'menus', loadComponent: () => import('./component/menu/menu.component').then(m => m.MenuComponent) },
            { path: 'expenses', loadComponent: () => import('./component/expenses/expenses.component').then(m => m.ExpensesComponent) },
            { path: 'chart', loadComponent: () => import('./component/page/chart/chart/chart.component').then(m => m.ChartComponent) },
        ]
    }
];

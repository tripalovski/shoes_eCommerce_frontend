import { Routes } from '@angular/router';
import { Shop } from './pages/Shop/shop/shop';
import { Admin } from './pages/admin/admin';
import { BrandList } from './pages/brand-list/brand-list';
import { AdminBrand } from './pages/admin-brand/admin-brand';
import { AdminOrders } from './pages/admin-orders/admin-orders';

export const routes: Routes = [
        {
        path:'', 
        redirectTo: 'home', 
        pathMatch: 'full'},
    // {
    //     path:'home', 
    //     component: 
    // },   
    {
        path:'shop', 
        component: Shop
    },
    {
        path:'admin', 
        component: Admin
    },
    {
        path:'brands', 
        component: BrandList
    },
    {
        path:'admin-brands', 
        component: AdminBrand
    },
    {
        path:'admin-orders', 
        component: AdminOrders
    },
];

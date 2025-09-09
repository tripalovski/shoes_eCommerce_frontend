import { Routes } from '@angular/router';
import { Shop } from './pages/shop/shop';
import { BrandList } from './pages/brand-list/brand-list';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { GuestUserNavbar } from './shared/components/guest-user-navbar/guest-user-navbar';
import { UserNavbar } from './shared/components/user-navbar/user-navbar';
import { AdminNavbar } from './shared/components/admin-navbar/admin-navbar';
import { authGuard } from './core/guards/auth-guard';
import { Role } from './core/enums/Role';
import { UserOrders } from './pages/User/user-orders/user-orders';
import { AdminShop } from './pages/Admin/admin-shop/admin-shop';
import { AdminBrand } from './pages/Admin/admin-brand/admin-brand';
import { AdminOrders } from './pages/Admin/admin-orders/admin-orders';
import { SingleFootwear } from './pages/single-footwear/single-footwear';

export const routes: Routes = [
    {
    path:'', 
    redirectTo: 'shop', 
    pathMatch: 'full'
    },
    {
        path: '',
        component: GuestUserNavbar,
        children:[
            {
                path:'shop', 
                component: Shop
            },
            {
                path:'shop/:id', 
                component: SingleFootwear
            },
            {
                path:'brands', 
                component: BrandList
            },
            {
                path:'register', 
                component: Register
            },
            {
                path:'login', 
                component: Login
            },
        ]  
    },
    {
        path: 'user',
        component: UserNavbar,
        canActivate: [authGuard],
        data: {
            roles: [Role.user]
        },
        children:[
            {
                path: '',
                redirectTo: 'shop',
                pathMatch: 'full'
            },
            {
                path:'shop', 
                component: Shop
            },
            {
                path:'brands', 
                component: BrandList
            },
            {
                path:'myOrders', 
                component: UserOrders
            },
            // My cart
            // profile..
        ]  
    },
    {
        path: 'admin',
        component: AdminNavbar,
        canActivate: [authGuard],
        data: {
            roles: [Role.admin]
        },
        children:[
            {
                path: '',
                redirectTo: 'shop',
                pathMatch: 'full'
            },
            {
                path:'shop', 
                component: AdminShop
            },

            {
                path:'brands', 
                component: AdminBrand
            },
            {
                path:'orders', 
                component: AdminOrders
            },
        ]  
    },
];

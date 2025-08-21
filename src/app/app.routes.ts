import { Routes } from '@angular/router';
import { Shop } from './pages/Shop/shop/shop';
import { Admin } from './pages/admin/admin';

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
];

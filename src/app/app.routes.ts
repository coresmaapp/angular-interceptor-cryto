import { Routes } from '@angular/router';

import { ProductosComponent } from '../app/productos/productos.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'productos',
        pathMatch:'full'
    },

    {
        path:'productos',
        component: ProductosComponent
    },

    {
        path:'login',
        component: LoginComponent
    },

];
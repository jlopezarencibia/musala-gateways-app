import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'gateway',
        children: [
            {
                path: 'list',
                loadChildren: () => import('./pages/gateway/gateway-list/gateway-list.module').then(m => m.GatewayListModule),
                data: {path: 'gateway/list', name: 'Gateway list'}
            },
            {
                path: 'create',
                loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
                data: {path: 'gateway/create', name: 'New gateway'}
            },
            {
                path: 'update/:id',
                loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
                data: {path: 'gateway/update', name: 'Edit gateway'}
            },
            {
                path: 'details/:id',
                loadChildren: () => import('./pages/gateway/gateway-details/gateway-details.module').then(m => m.GatewayDetailsModule),
                data: {path: 'gateway/details', name: 'Gateway details'}
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'peripheral',
        children: [
            {
                path: 'list',
                loadChildren: () => import('./pages/peripheral/peripheral-list/peripheral-list.module').then(m => m.PeripheralListModule),
                data: {path: 'peripheral/list', name: 'Peripheral list'}
            },
            {
                path: 'create',
                loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
                data: {path: 'peripheral/create', name: 'New peripheral'}
            },
            {
                path: 'update/:id',
                loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
                data: {path: 'peripheral/update', name: 'Edit peripheral'}
            },
            {
                path: 'details/:id',
                loadChildren: () => import('./pages/peripheral/peripheral-details/peripheral-details.module').then(m => m.PeripheralDetailsModule),
                data: {path: 'peripheral/details', name: 'Peripheral details'}
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'gateway',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

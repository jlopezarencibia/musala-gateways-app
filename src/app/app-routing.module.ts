import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'gateway',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/gateway/gateway-list/gateway-list.module').then(m => m.GatewayListModule),
          data: {path: 'gateway/list', depth: 0, name: 'Gateway list'}
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
        data: {path: 'gateway/create', depth: 1, name: 'New gateway'}
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
        data: {path: 'gateway/update', depth: 1, name: 'Edit gateway'}
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
          data: {path: 'peripheral/list', depth: 0, name: 'Peripheral list'}
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
        data: {path: 'peripheral/create', depth: 1, name: 'New peripheral'}
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
        data: {path: 'peripheral/update', depth: 1, name: 'Edit peripheral'}
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

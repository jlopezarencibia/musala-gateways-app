import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'gateway',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/gateway/gateway-list/gateway-list.module').then(m => m.GatewayListModule),
          data: {path: 'gateway/list', depth: 0}
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
        data: {path: 'gateway/create', depth: 1}
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
        data: {path: 'gateway/update', depth: 1}
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
          data: {path: 'peripheral/list', depth: 0}
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
        data: {path: 'peripheral/create', depth: 1}
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
        data: {path: 'peripheral/update', depth: 1}
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

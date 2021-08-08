import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'gateway',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./pages/gateway/gateway-list/gateway-list.module').then(m => m.GatewayListModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
        data: {mode: 'create'}
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/gateway/gateway-edit/gateway-edit.module').then(m => m.GatewayEditModule),
        data: {mode: 'update'}
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
        loadChildren: () => import('./pages/peripheral/peripheral-list/peripheral-list.module').then(m => m.PeripheralListModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
        data: {mode: 'create'}
      },
      {
        path: 'update/:id',
        loadChildren: () => import('./pages/peripheral/peripheral-edit/peripheral-edit.module').then(m => m.PeripheralEditModule),
        data: {mode: 'update'}
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
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

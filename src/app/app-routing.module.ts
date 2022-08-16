import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather-location-search',
    pathMatch: 'full',
  },
  {
    path: 'weather-location-search',
    loadChildren: () =>
      import('./routes/location-search/location-search.module').then(
        (m) => m.LocationSearchModule
      ),
  },
  {
    path: 'stock-sentiment',
    loadChildren: () =>
      import('./routes/location-detail/location-detail.module').then(
        (m) => m.LocationDetailModule
      ),
  },
  {
    path: '**',
    redirectTo: 'stock-manager',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

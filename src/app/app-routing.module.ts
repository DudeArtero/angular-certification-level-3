import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock-search',
    pathMatch: 'full',
  },
  {
    path: 'stock-search',
    loadChildren: () =>
      import('./routes/stock-search/stock-search.module').then(
        (m) => m.StockSearchModule
      ),
  },
  {
    path: 'stock-sentiment',
    loadChildren: () =>
      import('./routes/stock-sentiment/stock-sentiment.module').then(
        (m) => m.StockSentimentModule
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

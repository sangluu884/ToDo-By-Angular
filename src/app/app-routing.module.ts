import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent }   from './all.component';
import { ActiveComponent }      from './active.component';
import { CompletedComponent }  from './completed.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full' },
  { path: 'all',     component: AllComponent },
  { path: 'active',  component: ActiveComponent },
  { path: 'completed', component: CompletedComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

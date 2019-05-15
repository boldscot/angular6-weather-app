import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MiddleTopPanelComponent } from './middle-top-panel/middle-top-panel.component';
import { ForecastComponent } from './forecast/forecast.component';

const routes: Routes= [
  { path: '', redirectTo: '/mtp', pathMatch: 'full' },
  { path: 'mtp', component: MiddleTopPanelComponent }, 
  { path: 'forecast', component: ForecastComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

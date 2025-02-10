import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'timer',
    loadChildren: () =>
      import('./timer/timer.module').then((m) => m.TimerModule),
  },
  {
    path: 'alarm',
    loadChildren: () =>
      import('./alarm/alarm.module').then((m) => m.AlarmModule),
  },
  {
    path: 'stopwatch',
    loadChildren: () =>
      import('./stopwatch/stopwatch.module').then((m) => m.StopwatchModule),
  },
  {
    path: 'time',
    loadChildren: () => import('./time/time.module').then((m) => m.TimeModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

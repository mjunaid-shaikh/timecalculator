import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopWatchComponent } from './stop-watch/stop-watch.component';

const routes: Routes = [
  {
    path: '',
    component: StopWatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopwatchRoutingModule {}

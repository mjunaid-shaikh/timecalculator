import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldClockComponent } from './world-clock/world-clock.component';

const routes: Routes = [
  {
    path: '',
    component: WorldClockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorldClockRoutingModule {}

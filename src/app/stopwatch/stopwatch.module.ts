import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopwatchRoutingModule } from './stopwatch-routing.module';
import { StopWatchComponent } from './stop-watch/stop-watch.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StopWatchComponent],
  imports: [CommonModule, StopwatchRoutingModule, SharedModule],
})
export class StopwatchModule {}

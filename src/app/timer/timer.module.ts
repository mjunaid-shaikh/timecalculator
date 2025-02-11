import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerRoutingModule } from './timer-routing.module';
import { TimerComponent } from './timer/timer.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimerComponent],
  imports: [CommonModule, TimerRoutingModule, SharedModule, FormsModule],
})
export class TimerModule {}

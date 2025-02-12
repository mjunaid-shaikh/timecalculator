import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldClockRoutingModule } from './world-clock-routing.module';
import { WorldClockComponent } from './world-clock/world-clock.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WorldClockComponent],
  imports: [CommonModule, WorldClockRoutingModule, SharedModule],
})
export class WorldClockModule {}

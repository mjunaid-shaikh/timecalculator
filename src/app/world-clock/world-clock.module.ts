import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldClockRoutingModule } from './world-clock-routing.module';
import { WorldClockComponent } from './world-clock/world-clock.component';
import { SharedModule } from '../shared/shared.module';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorldClockComponent, SearchFilterPipe],
  imports: [CommonModule, WorldClockRoutingModule, SharedModule, FormsModule],
})
export class WorldClockModule {}

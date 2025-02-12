import { Component, OnInit } from '@angular/core';
import { TimeZoneService } from 'src/app/services/time-zone.service';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.css'],
})
export class WorldClockComponent implements OnInit {
  timeZones: any[] = [];

  constructor(private timeZoneService: TimeZoneService) {}
  ngOnInit() {
    this.updateTimeZones();

    // Update every second
    setInterval(() => {
      this.updateTimeZones();
    }, 1000);
  }

  updateTimeZones() {
    this.timeZones = this.timeZoneService.getAllTimeZones();
  }
}

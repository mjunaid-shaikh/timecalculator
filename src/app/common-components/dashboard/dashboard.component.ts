import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentTime: string = '';
  dayName: any;
  dayDate: any;
  private timer: any;

  // Define the days array
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(private title: Title) {}

  ngOnInit() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1);
    this.getToday();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  private updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    // const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // Convert 24h to 12h format

    this.title.setTitle(this.currentTime);
    this.currentTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    // this.currentTime = `${formattedHours}:${minutes}:${seconds}:${milliseconds} ${ampm}`;
  }

  getToday() {
    const today = new Date();

    // Get day name
    this.dayName = this.days[today.getDay()];

    // Get date, month (corrected to 1-based index), and year
    const date = today.getDate();
    const month = today.getMonth() + 1; // +1 to make it human-friendly (1-12)
    const year = today.getFullYear();

    // Format dayDate as "DD-MM-YYYY"
    this.dayDate = `${date.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;

    // Log the formatted date
    console.log(`${this.dayName}, ${this.dayDate}`);
  }
}

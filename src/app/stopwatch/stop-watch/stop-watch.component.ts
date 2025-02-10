import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.css'],
})
export class StopWatchComponent implements OnInit {
  timer: number = 0; // Timer value in milliseconds
  interval: any; // Reference to the interval
  isRunning: boolean = false; // To track if the stopwatch is running
  displayTime: string = '00:00:00'; // Formatted time string
  activeAction: string = ''; // Tracks the active action ('play', 'pause', 'reset')

  lapTimes: { lapTime: string; elapsedTime: string }[] = [];
  lastLapTime = 0;

  constructor() {}

  ngOnInit(): void {}

  // Toggle between Play and Pause
  togglePlayPause() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Start the stopwatch
  play() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.activeAction = 'play';
      this.interval = setInterval(() => {
        this.timer += 10; // Increment timer by 10 milliseconds
        this.updateDisplayTime();
      }, 10); // Update every 10 milliseconds
    }
  }

  // Pause the stopwatch
  pause() {
    if (this.isRunning) {
      this.isRunning = false;
      this.activeAction = 'pause';
      clearInterval(this.interval); // Stop the interval
    }
  }

  // Reset the stopwatch
  reset() {
    this.pause(); // Stop the timer
    this.timer = 0; // Reset the timer value
    this.activeAction = 'reset';
    this.lapTimes = [];
    this.updateDisplayTime(); // Reset the display
  }

  // Update the display time in hh:mm:ss format
  updateDisplayTime() {
    const hours = Math.floor(this.timer / 3600000); // Get total hours
    const minutes = Math.floor((this.timer % 3600000) / 60000); // Get remaining minutes
    const seconds = Math.floor((this.timer % 60000) / 1000); // Get remaining seconds
    const milliseconds = Math.floor((this.timer % 1000) / 10); // Get remaining milliseconds (2 digits)

    // Format time as hh:mm:ss
    this.displayTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(
      seconds
    )}.${this.pad(milliseconds, 2)}`;
  }

  // Add leading zeros to a number
  pad(num: number, size: number = 2): string {
    return num.toString().padStart(size, '0');
  }

  // laping time
  lap() {
    if (this.activeAction === 'play') {
      let currentLapTime = this.timer - this.lastLapTime;

      // Fix: Allow the first lap to be 0 instead of skipping it
      if (this.lapTimes.length === 0) {
        currentLapTime = this.timer; // First lap is based on total time
      }

      this.lastLapTime = this.timer;

      const hours = Math.floor(currentLapTime / 3600000);
      const minutes = Math.floor((currentLapTime % 3600000) / 60000);
      const seconds = Math.floor((currentLapTime % 60000) / 1000);
      const milliseconds = Math.floor((currentLapTime % 1000) / 10);

      const formattedLapTime = `${this.pad(hours)}:${this.pad(
        minutes
      )}:${this.pad(seconds)}.${this.pad(milliseconds, 2)}`;

      this.lapTimes.push({
        lapTime: formattedLapTime,
        elapsedTime: this.displayTime.replace(/<[^>]*>/g, ''), // Remove HTML tags for clean display
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css'],
})
export class AlarmComponent implements OnInit {
  ngOnInit(): void {}

  // alarmForm: FormGroup;
  // activeAlarms: any[] = [];
  // hours: string[] = Array.from(
  //   { length: 12 },
  //   (_, i) => `${(i + 1).toString().padStart(2, '0')} AM`
  // ).concat(
  //   Array.from(
  //     { length: 12 },
  //     (_, i) => `${(i + 1).toString().padStart(2, '0')} PM`
  //   )
  // );
  // minutes: string[] = Array.from({ length: 60 }, (_, i) =>
  //   i.toString().padStart(2, '0')
  // );
  // seconds: string[] = Array.from({ length: 60 }, (_, i) =>
  //   i.toString().padStart(2, '0')
  // );

  // constructor(private fb: FormBuilder) {
  //   this.alarmForm = this.fb.group({
  //     alarms: this.fb.array([this.createAlarmGroup()]),
  //   });
  // }

  // get alarms() {
  //   return this.alarmForm.get('alarms') as FormArray;
  // }

  // createAlarmGroup(): FormGroup {
  //   return this.fb.group({
  //     hour: ['01 AM'],
  //     minute: ['00'],
  //     second: ['00'],
  //     title: [''],
  //   });
  // }

  // addAlarm() {
  //   this.alarms.push(this.createAlarmGroup());
  // }

  // removeAlarm(index: number) {
  //   this.alarms.removeAt(index);
  // }

  // setAlarms() {
  //   this.activeAlarms = this.alarmForm.value.alarms.map((alarm: any) => {
  //     const now = new Date();
  //     const [hour, period] = alarm.hour.split(' ');
  //     let alarmHour = parseInt(hour, 10);
  //     if (period === 'PM' && alarmHour !== 12) alarmHour += 12;
  //     if (period === 'AM' && alarmHour === 12) alarmHour = 0;
  //     const alarmMinute = parseInt(alarm.minute, 10);
  //     const alarmSecond = parseInt(alarm.second, 10);

  //     const alarmTime = new Date();
  //     alarmTime.setHours(alarmHour, alarmMinute, alarmSecond, 0);

  //     let diff = Math.floor((alarmTime.getTime() - now.getTime()) / 1000);
  //     if (diff < 0) diff = -diff;

  //     return { ...alarm, remainingTime: this.formatTime(diff) };
  //   });

  //   this.startCountdown();
  // }

  // startCountdown() {
  //   setInterval(() => {
  //     this.activeAlarms.forEach((alarm) => {
  //       let totalSeconds = this.timeToSeconds(alarm.remainingTime);
  //       if (totalSeconds > 0) {
  //         totalSeconds--;
  //         alarm.remainingTime = this.formatTime(totalSeconds);
  //       } else {
  //         console.log('error');
  //       }
  //     });
  //   }, 1000);
  // }

  // timeToSeconds(time: string): number {
  //   const [minutes, seconds] = time.split(':').map(Number);
  //   return minutes * 60 + seconds;
  // }

  // formatTime(seconds: number): string {
  //   const minutes = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${secs
  //     .toString()
  //     .padStart(2, '0')}`;
  // }

  // stopAlarm(index: number) {
  //   this.activeAlarms.splice(index, 1);
  // }

  alarmForm: FormGroup;
  activeAlarms: any[] = [];
  alarmAudio = new Audio(); // Create an Audio object
  alarmPlaying = false; // Track if the alarm is playing

  hours: string[] = Array.from(
    { length: 12 },
    (_, i) => `${(i + 1).toString().padStart(2, '0')} AM`
  ).concat(
    Array.from(
      { length: 12 },
      (_, i) => `${(i + 1).toString().padStart(2, '0')} PM`
    )
  );
  minutes: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  seconds: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  constructor(private fb: FormBuilder) {
    this.alarmForm = this.fb.group({
      alarms: this.fb.array([this.createAlarmGroup()]),
    });

    this.alarmAudio.src = 'assets/alarm_music/alarm1.mp3'; // Set audio file
    this.alarmAudio.load(); // Preload the audio
  }

  get alarms() {
    return this.alarmForm.get('alarms') as FormArray;
  }

  createAlarmGroup(): FormGroup {
    return this.fb.group({
      hour: ['01 AM'],
      minute: ['00'],
      second: ['00'],
      title: [''],
    });
  }

  addAlarm() {
    this.alarms.push(this.createAlarmGroup());
  }

  removeAlarm(index: number) {
    this.alarms.removeAt(index);
  }

  setAlarms() {
    this.activeAlarms = this.alarmForm.value.alarms.map((alarm: any) => ({
      ...alarm,
      remainingTime: this.calculateRemainingTime(alarm),
    }));

    this.startAlarmCountdown();
  }

  calculateRemainingTime(alarm: any): string {
    const now = new Date();
    let alarmHour = parseInt(alarm.hour);
    const isPM = alarm.hour.includes('PM');

    if (isPM && alarmHour !== 12) {
      alarmHour += 12;
    } else if (!isPM && alarmHour === 12) {
      alarmHour = 0; // Convert 12 AM to 00
    }

    const alarmTime = new Date();
    alarmTime.setHours(
      alarmHour,
      parseInt(alarm.minute),
      parseInt(alarm.second)
    );

    let diff = alarmTime.getTime() - now.getTime();
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // If time is in past, add a day
    }

    const remainingMinutes = Math.floor(diff / (1000 * 60));
    const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${remainingMinutes}:${remainingSeconds}`;
  }

  startAlarmCountdown() {
    setInterval(() => {
      this.activeAlarms.forEach((alarm, index) => {
        const remainingTime = this.calculateRemainingTime(alarm);
        this.activeAlarms[index].remainingTime = remainingTime;

        if (remainingTime === '0:0') {
          this.playAlarm();
        }
      });
    }, 1000);
  }

  playAlarm() {
    if (!this.alarmPlaying) {
      this.alarmAudio.play();
      this.alarmPlaying = true;
      // alert('Tick Tock! Alarm ringing!');
    }
  }

  stopAlarm(index: number) {
    this.activeAlarms.splice(index, 1);
    this.stopAlarmSound();
  }

  stopAlarmSound() {
    this.alarmAudio.pause();
    this.alarmAudio.currentTime = 0;
    this.alarmPlaying = false;
  }
}

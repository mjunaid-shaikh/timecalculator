import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class TimeZoneService {
  constructor() {}

  getAllTimeZones() {
    return moment.tz.names().map((zone) => {
      const now = moment().tz(zone);
      const utcOffset = now.utcOffset() / 60; // Convert minutes to hours
      const todayOrYesterday = now.isSame(moment().utc(), 'day')
        ? 'Today'
        : 'Yesterday';

      return {
        country: zone,
        time: now.format('hh:mm:ss A'),
        utcOffset: utcOffset >= 0 ? `+${utcOffset}` : utcOffset.toString(),
        dayStatus: todayOrYesterday,
      };
    });
  }
}

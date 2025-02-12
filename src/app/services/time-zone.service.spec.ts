import { TestBed } from '@angular/core/testing';

import { TimeZoneService } from './time-zone.service';

describe('TimeZoneService', () => {
  let service: TimeZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

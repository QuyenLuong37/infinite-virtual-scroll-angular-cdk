import { TestBed } from '@angular/core/testing';

import { InfinityAppointmentScrollDataService } from './infinity-appointment-scroll-data.service';

describe('InfinityAppointmentScrollDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfinityAppointmentScrollDataService = TestBed.get(InfinityAppointmentScrollDataService);
    expect(service).toBeTruthy();
  });
});

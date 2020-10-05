import { TestBed } from '@angular/core/testing';

import { OtpProviderService } from './otp-provider.service';

describe('OtpProviderService', () => {
  let service: OtpProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

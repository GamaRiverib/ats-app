import { TestBed } from '@angular/core/testing';

import { WsChannelService } from './ws-channel.service';

describe('WsChannelService', () => {
  let service: WsChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

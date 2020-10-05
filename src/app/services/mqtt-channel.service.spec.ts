import { TestBed } from '@angular/core/testing';

import { MqttChannelService } from './mqtt-channel.service';

describe('MqttChannelService', () => {
  let service: MqttChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

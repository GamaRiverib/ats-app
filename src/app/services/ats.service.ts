import { Injectable } from '@angular/core';
import { AtsEvents, SystemState } from '../app.values';
import { MQTTChannel } from './mqtt-channel.service';


@Injectable({
  providedIn: 'root'
})
export class AtsService {

  private listeners: any = {};

  private lastSystemState: SystemState;

  constructor(private mqttChannel: MQTTChannel) {

    this.startMQTTChannel();

    this.mqttChannel.connect();

    this.subscribe(AtsEvents.SYSTEM_STATE_CHANGED, d => {
      console.debug(d);
      this.lastSystemState = d
    });
  }

  get systemState(): SystemState {
    return this.lastSystemState;
  }

  get connected(): boolean {
    return this.mqttChannel.connected();
  }

  get remotelyConnected(): boolean {
    return this.mqttChannel.connected();
  }

  private startMQTTChannel(): void {
    this.mqttChannel.onConnected(this.onMQTTChannelConnected.bind(this));
    this.mqttChannel.onDisconnected(this.onMQTTChannelDisconnected.bind(this));
    this.mqttChannel.onLWT(this.onLWT.bind(this));
    this.mqttChannel.onSystemEvent(this.handleSystemEvent.bind(this));
  }

  private onMQTTChannelConnected(): void {
    this.notify(AtsEvents.MQTT_CONNECTED);
  }

  private onMQTTChannelDisconnected(): void {
    this.notify(AtsEvents.MQTT_DISCONNECTED);
  }


  private handleSystemEvent(event: string, data: any): void {
    /*const d = data.toString();
    const systemState = { state: 0, mode: 0, activedSensors: [] };
    systemState.state = Number.parseInt(d.charAt(0), 32);
    systemState.mode = Number.parseInt(d.charAt(1), 32);
    const leftTimeout = Number.parseInt(d.charAt(2) + '' + d.charAt(3), 32);
    const count = Number.parseInt(d.charAt(4) + '' + d.charAt(5), 32);
    for (let i = 6; i < 6 + count * 2; i++) {
      systemState.activedSensors.push(Number.parseInt(d.charAt(i++) + '' + d.charAt(i), 32));
    }
    const payload = { system: systemState, leftTimeout };
    this.notify(AtsEvents[event], payload);*/
    console.log(data);
    const payload = { system: data.system }
    this.notify(event, payload)
  }

  private onLWT(online: boolean): void {
    console.log('onLWT', online);
    if (online) {
      this.notify(AtsEvents.SERVER_LWT_ONLINE);
    } else {
      this.notify(AtsEvents.SERVER_LWT_OFFLINE);
    }
  }

  private notify(event: string, data?: any): void {
    if (AtsEvents[event] && this.listeners[event]) {
      this.listeners[event].forEach((h: (data: any) => any) => h(data));
    }
  }

  subscribe(event: string, callback: (data: any) => void): { unsubscribe: () => void } {
    if (AtsEvents[event]) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      if (typeof callback === 'function') {
        this.listeners[event].push(callback);
      }
    }
    return {
      unsubscribe: () => {
        const index = this.listeners[event].findIndex((listener: any) => {
          return listener === callback;
        });

        if (index >= 0) {
          this.listeners[event].splice(index, 1);
        } else {
          console.log('Listener not found', event, callback);
        }
      }
    };
  }

}

import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, IOnConnectEvent, IOnErrorEvent, MqttService } from 'ngx-mqtt';
import { BROKER } from 'src/environments/environment';
import { Channel } from '../app.values';

const brokerUrl = BROKER.host;
const brokerPort = BROKER.port;
const brokerProtocol = BROKER.protocol as 'ws' | 'wss';
const mqttUser = BROKER.username;
const mqttPass = BROKER.password;
const mqttTopic = BROKER.topic;
// const cmndTopic = BROKER.commands;

const CLIENT_ID = "atsapp";

const timeout = 30000;

interface Listener {
  topic: string;
  callback: [(data: any) => void];
}

@Injectable({
  providedIn: 'root'
})
export class MQTTChannel implements Channel {

  private online = false;

  private connectedHandler: () => void = null;
  private disconnectedHandler: () => void = null;

  private lwtHandler: (online: boolean) => void = null;

  private systemEventHandler: (event: string, payload: any) => void = null;

  private listeners: Listener[] = [];

  constructor(private mqttService: MqttService) {
    this.init();
  }

  private init(): void {
    this.mqttService.onError.subscribe(this.onMqttConnectionFailure.bind(this));
    this.mqttService.onConnect.subscribe(this.onMqttConnectionSuccess.bind(this));
    this.mqttService.onOffline.subscribe(this.onMqttConnectionLost.bind(this));
    // this.mqttService.onMessageArrived.on(this.onMqttMessageArrived.bind(this));
  }

  private onMqttConnectionFailure(event: IOnErrorEvent): void {
    this.online = false;
    console.log('MQTT connection failure', event);
  }

  private onMqttConnectionSuccess(event: IOnConnectEvent): void {
    this.online = true;
    if (this.connectedHandler) {
      this.connectedHandler();
    }
    console.log('Connected to MQTT', brokerUrl, brokerPort);
    console.log(`Subscribe to users/${BROKER.username}/events/#`);
    try {
      this.mqttService
        .observe(`${mqttTopic}/lwt`, { qos: 0 })
        .subscribe(this.onLwtMessageArrived.bind(this));
      this.mqttService
        .observe(`users/${BROKER.username}/events/#`, { qos: 0 })
        .subscribe(this.onSytemEventMessageArrived.bind(this));
    } catch (e) {
      console.log(e);
    }
  }

  private onMqttConnectionLost(): void {
    this.online = false;
    if (this.disconnectedHandler) {
      this.disconnectedHandler();
    }
    console.log('MQTT connection lost');
  }

  private onLwtMessageArrived(message: IMqttMessage): void {
    const topic: string = message.topic;
    const subTopic: string = topic.substr(mqttTopic.length + 1);
    const payload: string = message.payload.toString();

    console.log(topic, payload);

   if (subTopic === 'lwt') {
      if (this.lwtHandler) {
        const online: boolean = payload.toLowerCase() === 'online';
        this.lwtHandler(online);
      }
    }
  }

  private onSytemEventMessageArrived(message: IMqttMessage): void {
    const topic: string = message.topic;
    const subTopics: string[] = topic.split('/');
    const event: string = subTopics[subTopics.length -1];
    const data: string = message.payload.toString();

    console.log(topic, event, data);

    if (this.systemEventHandler) {
      const payload = JSON.parse(data);
      this.systemEventHandler(event, payload);
    }

  }

  private getListenerIndex(topic: string): number {
    let index = -1;
    this.listeners.forEach((l: Listener, i: number) => {
      if (l.topic === topic) {
        index = i;
        return;
      }
    });
    return index;
  }

  private addListener(topic: string, callback: (data: any) => void): void {
    const index: number = this.getListenerIndex(topic);
    if (index >= 0) {
        this.listeners[index].callback.push(callback);
    } else {
        this.listeners.push({ topic, callback: [callback] });
    }
  }

  private removeAllListeners(topic: string): void {
    const index: number = this.getListenerIndex(topic);
    if (index >= 0) {
      this.listeners.slice(index, 1);
    }
  }

  private emit(topic: string, data: any): void {
    const index: number = this.getListenerIndex(topic);
    if (index >= 0) {
      const listeners = this.listeners[index].callback;
      listeners.forEach((l: (data: any) => void) => {
        if (l) {
          l(data);
        }
      });
    }
  }

  connect(): void {
    console.log('MQTT connected', this.connected());
    if (this.connected()) {
      console.log('MQTT channel is already connected');
      return;
    }
    console.log('Connecting to MQTT broker...');

    const opts: IMqttServiceOptions = {
      hostname: brokerUrl,
      port: brokerPort,
      protocol: brokerProtocol,
      username: mqttUser,
      password: mqttPass,
      reconnectPeriod: 3000,
      clean: false,
      clientId: `${CLIENT_ID}-${Math.floor((Math.random() * 1000) + 1)}`
    };

    this.mqttService.connect(opts);
  }

  connected(): boolean {
    return this.online;
  }

  onConnected(handler: () => void): void {
    this.connectedHandler = handler;
  }

  onDisconnected(handler: () => void): void {
    this.disconnectedHandler = handler;
  }

  subscribe(topic: string, callback: (data: any) => void, config?: any): void {
    if (this.connected()) {
      this.addListener(topic, callback);
    }
  }

  onSystemEvent(handler: (event: string, payload: any) => void): void {
    this.systemEventHandler = handler;
  }

  onLWT(handler: (online: boolean) => void): void {
    this.lwtHandler = handler;
  }
}

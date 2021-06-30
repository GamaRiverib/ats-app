export const AtsEvents = {
    NOT_AUTHORIZED: 'NOT_AUTHORIZED',
    PIN_CODE_UPDATED: 'PIN_CODE_UPDATED',
    SYSTEM_STATE_CHANGED: 'SYSTEM_STATE_CHANGED',
    SENSOR_REGISTERED: 'SENSOR_REGISTERED',
    SENSOR_CHANGED: 'SENSOR_CHANGED',
    SENSOR_DELETED: 'SENSOR_DELETED',
    SENSOR_ACTIVED: 'SENSOR_ACTIVED',
    ENTRY_TIME_CHANGED: 'ENTRY_TIME_CHANGED',
    EXIT_TIME_CHANGED: 'EXIT_TIME_CHANGED',
    BEEP_CHANGED: 'BEEP_CHANGED',
    SILENT_ALARM_CHANGED: 'SILENT_ALARM_CHANGED',
    CENTRAL_PHONE_CHANGED: 'CENTRAL_PHONE_CHANGED',
    ADMIN_PHONE_CHANGED: 'ADMIN_PHONE_CHANGED',
    OWNER_PHONE_ADDED: 'OWNER_PHONE_ADDED',
    OWNER_PHONE_CHANGED: 'OWNER_PHONE_CHANGED',
    OWNER_PHONE_DELETED: 'OWNER_PHONE_DELETED',
    CENTRAL_EMAIL_CHANGED: 'CENTRAL_EMAIL_CHANGED',
    ADMIN_EMAIL_CHANGED: 'ADMIN_EMAIL_CHANGED',
    OWNER_EMAIL_ADDED: 'OWNER_EMAIL_ADDED',
    OWNER_EMAIL_CHANGED: 'OWNER_EMAIL_CHANGED',
    OWNER_EMAIL_DELETED: 'OWNER_EMAIL_DELETED',
    BYPASS_CHANGE: 'BYPASS_CHANGE',
    SYSTEM_ARMED: 'SYSTEM_ARMED',
    SYSTEM_DISARMED: 'SYSTEM_DISARMED',
    SYSTEM_ALARMED: 'SYSTEM_ALARMED',
    SYSTEM_ALERT: 'SYSTEM_ALERT',
    SIREN_ACTIVED: 'SIREN_ACTIVED',
    SIREN_SILENCED: 'SIREN_SILENCED',
    MAX_ALERTS: 'MAX_ALERTS',
    MAX_UNAUTHORIZED_INTENTS: 'MAX_UNAUTHORIZED_INTENTS',
    WEB_SOCKET_CONNECTED: 'WEB_SOCKET_CONNECTED',
    WEB_SOCKET_DISCONNECTED: 'WEB_SOCKET_DISCONNECTED',
    MQTT_CONNECTED: 'MQTT_CONNECTED',
    MQTT_DISCONNECTED: 'MQTT_DISCONNECTED',
    SERVER_LWT_ONLINE: 'SERVER_LWT_ONLINE',
    SERVER_LWT_OFFLINE: 'SERVER_LWT_OFFLINE',
    SENSORS_UPDATED: 'SENSORS_UPDATED'
};

export const ProtocolMesssages = {
    Time: 'Time',
    Events: 'Events',
    Sensors: 'Sensors',
    is: 'is',
    Who: 'Who',
    state: 'state',
    command: 'command'
};

export const AtsModes = ['AWAY', 'STAY', 'MAXIMUM', 'NIGHT STAY', 'INSTANT', 'CHIME'];

export const AtsStates = ['READY', 'DISARMED', 'LEAVING', 'ARMED', 'ENTERING', 'ALARMED', 'PROGRAMMING'];

export enum SensorTypes {
    PIR_MOTION = 0,
    MAGNETIC_SWITCH = 1,
    IR_SWITCH = 2
}

export enum SensorGroup {
    INTERIOR = 0,
    PERIMETER = 1,
    EXTERIOR = 2,
    ACCESS = 3
}

export interface Sensor {
    id: string;
    device: string;
    type: SensorTypes;
    name: string;
    group: SensorGroup;
    bypass: boolean;
    chime?: string;
    online?: boolean;
}

export interface SystemState {
    before: number;
    state: number;
    mode: number;
    activedSensors: Array<number>;
    leftTime: number;
    uptime: number;
}

export enum AtsErrors {
    NOT_AUTHORIZED = 0,
    INVALID_SYSTEM_STATE = 1,
    BAD_REQUEST = 2,
    WAS_A_PROBLEM = 3,
    EMPTY_RESPONSE = 4,
    NOT_CONNECTED = 5,
    TIMEOUT = 6
}

export interface Channel {
    connect(): void;
    connected(): boolean;
    onConnected(handler: () => void): void;
    onDisconnected(handler: () => void): void;
    subscribe(topic: string, callback: (data: any) => void, config?: any): void;
}

export const KEYS_ICONS = [
    'ready',
    'disarmed',
    'leaving',
    'armed',
    'entering',
    'alarmed',
    'programming'
];

export const SensorTypesFriendlyNames = [
    'Pir motion',
    'Magnetic switch',
    'IR switch'
];

export const SensorGroupFriendlyNames = [
    'Interior',
    'Perimeter',
    'Exterior',
    'Access'
];

export interface SensorData {
    id: string;
    device: string;
    name: string;
    type: number;
    group: number;
    typeName: string;
    groupName: string;
    actived: boolean;
    bypass: boolean;
    online: boolean;
}

export const PATHS = {
    HOME: 'home',
    PROGRAMMING: 'programming',
    PROGRAMMING_SENSORS: 'programming/sensors'
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const OAUTH_CLIENT_ID = 'iot.core.s8nw1gk';
export const OAUTH_CLIENT_SECRET = '78a431awn0c85bv8irtxonvsai6may7n';
export const REDIRECT_URI = 'https://ats.gamarivera.dev/oauth2/r';
export const OAUTH_URL = 'https://tasmota-auth.gamarivera.dev/auth';

export const SERVER_URL = 'http://localhost:8080';
export const BROKER = {
  host: 'mqtt.gamarivera.dev',
  port: 8083,
  protocol: 'wss',
  username: 'gama',
  password: 'test',
  topic: '/ats',
  commands: 'commands'
};
export const SERVER_TRUST_MODE = 'pinned';

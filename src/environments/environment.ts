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

export const CLIENT_ID = '';
export const CLIENT_SECRET = '';

export const OAUTH_CLIENT_ID = '';
export const OAUTH_CLIENT_SECRET = '';
export const REDIRECT_URI = '';
export const OAUTH_URL = '';

export const SERVER_URL = '';
export const WS_SERVER_URL = '';
export const ATS_WS_CHANNEL_PATH = '';
export const BROKER = {
  host: '',
  port: 1883,
  protocol: 'ws',
  username: '',
  password: '',
  topic: '/ats',
  commands: 'commands'
};
export const SERVER_TRUST_MODE = 'pinned';

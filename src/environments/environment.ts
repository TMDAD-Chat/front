// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gateway: "https://gateway:8443",
  messageReceiveApi: '/v1/messagereceive',
  firebase: {
    apiKey: "AIzaSyCt9SroQN6JI9stZr3i6k9MPgfwurJw1Qg",
    authDomain: "tmdad-chat-app.firebaseapp.com",
    projectId: "tmdad-chat-app",
    storageBucket: "tmdad-chat-app.appspot.com",
    messagingSenderId: "367127983637",
    appId: "1:367127983637:web:6fa5a2b672e831261b801c",
    measurementId: "G-KHQK6J8BGN"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

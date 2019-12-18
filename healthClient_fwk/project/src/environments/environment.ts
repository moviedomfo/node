// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AppOAuth_Base:"http://localhost/fwkAuthenticationWebApi",
  AppAPI_BaseURL:"http://localhost/fwkDispatcherWebApi",
  
  oaut_client_id:'nodeJSClient',
  oaut_client_secret:'pletorico28',
  oaut_securityProviderName:'healthTesting',
  DefaultHealthInstitutionId:   'DBDC42D2-A8EB-469F-BF94-282BC7F57A4A',
  iddleTimeout_seconds:600,//idle timeout of 5 
  iddle_waite_Timeout_seconds : 5 ,//period of time in seconds. after 10 seconds of inactivity, the user will be considered timed out.
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

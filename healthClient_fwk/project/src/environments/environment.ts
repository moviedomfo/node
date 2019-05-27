// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HealthAPI_URL:"http://localhost:52000/api/",
  HealthExecuteAPI_URL:"http://localhost:52000/api/fwk/execute",
  HealthExecuteService_allowedAuthAPI_URL:"http://localhost:52000/api/fwk/execute",
  HealthOAuth_URL:"http://localhost:51000/oauth/token", 
  oaut_client_id:'nodeJSClient',
  oaut_client_secret:'pletorico28',
  oaut_securityProviderName:'healthTesting',
  DefaultHealthInstitutionId:   'DBDC42D2-A8EB-469F-BF94-282BC7F57A4A'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

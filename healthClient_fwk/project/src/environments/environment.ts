// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AppAPI_BaseURL:"http://localhost:52000",
  
  AppOAuth_Base:"http://localhost:51000", 
  oaut_client_id:'nodeJSClient',
  oaut_client_secret:'pletorico28',
  oaut_securityProviderName:'healthTesting',
  DefaultHealthInstitutionId:   'DBDC42D2-A8EB-469F-BF94-282BC7F57A4A',
  CNN_STRING_HEALTH: {
    user: 'sa',
    password: 'as',
    server: 'SANTANA\\SQLEXPRESS2014',
    database: 'health3',

    options: {
        encrypt: true // Use this if you're on Windows Azure 
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  App_BaseURL:"http://localhost:52000/",
  AppOAuth_BaseUrl:"http://201.234.32.177:51000/", 
  oaut_client_id: 'nodeJSClient',//'reteteosClient',
  oaut_client_secret:'pletorico28',
  oaut_securityProviderName:'healthTesting',
  
  iddleTimeout_seconds:600,//idle timeout of 10' 
  iddle_waite_Timeout_seconds : 5//period of time in seconds. after 10 seconds of inactivity, the user will be considered timed out.
  
  
};

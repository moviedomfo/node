export const environment = {
  production: true,
  HealthAPI_URL:"http://localhost/fwkDispatcherWebApi/api/",
  AppExecuteAPI_URL:"http://localhost/fwkDispatcherWebApi/api/fwk/execute",
  AppExecuteService_allowedAuthAPI_URL:"http://localhost/fwkDispatcherWebApi/api/fwk/execute",
  AppOAuth_URL:"http://localhost/fwkAuthenticationWebApi/oauth/token", 
  oaut_client_id:'nodeJSClient',
  oaut_client_secret:'pletorico28',
  oaut_securityProviderName:'healthTesting',
  DefaultHealthInstitutionId:   'DBDC42D2-A8EB-469F-BF94-282BC7F57A4A',
  iddleTimeout_seconds:600,//idle timeout of 5 
  iddle_waite_Timeout_seconds : 5 ,//period of time in seconds. after 10 seconds of inactivity, the user will be considered timed out.
};

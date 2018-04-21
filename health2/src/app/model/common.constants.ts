
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Param, IParam, IContextInformation ,IRequest} from '../model/common.model';
import { HttpHeaders } from '@angular/common/http';

let header_httpClient_contentTypeJson = new HttpHeaders({ 'Content-Type': 'application/json' });
     header_httpClient_contentTypeJson.append('Access-Control-Allow-Methods', '*');
     header_httpClient_contentTypeJson.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
     header_httpClient_contentTypeJson.append('Access-Control-Allow-Origin', '*');
     
let header_httpClient_form_urlencoded = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    header_httpClient_form_urlencoded.append('Access-Control-Allow-Methods', '*');
    header_httpClient_form_urlencoded.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header_httpClient_form_urlencoded.append('Access-Control-Allow-Origin', '*');


//let options = new RequestOptions({ headers: headers });

export  const HealtConstants={
     CNN_STRING_HEALTH: {
            user: 'sa',
            password: 'as',
            server: 'SANTANA\\SQLEXPRESS2008',
            database: 'health3',

            options: {
                encrypt: true // Use this if you're on Windows Azure 
                }
            },
     HealthAPI_URL:"http://localhost:63251/api/",
     HealthExecuteAPI_URL:"http://localhost:63251/api/patients/execute",
     HealthOAuth_URL:"http://localhost:63251/oauth/token",
     ImagesSrc_Woman:'assets/images/User_Famele.bmp',
     ImagesSrc_Man:'assets/images/User_Male.bmp',
     //httpOptions:options,
     httpClientOption_form_urlencoded:{headers:header_httpClient_form_urlencoded},
     httpClientOption_contenttype_json:{headers:header_httpClient_contentTypeJson},
     DefaultHealthInstitutionId:   'DBDC42D2-A8EB-469F-BF94-282BC7F57A4A',
     oaut_client_id:'olecram',
     oaut_client_secret:'1234'
}

export const Sexo =
{
    Masculino : 0,
    Femenino : 1
};


  export  const contextInfo ={
        Culture: "ES-AR",
        ProviderNameWithCultureInfo:"",
        HostName : 'localhost',
        HostIp : '10.10.200.168',
        HostTime : new Date(),
        ServerName : 'WebAPIDispatcherClienteWeb',
        ServerTime : new Date(),
        UserName : 'mrenaudo',
        UserId : '466541AB-0DB6-47CB-A19E-46152EDEE4A3',
        AppId : 'Healt',
        ProviderName: 'health'
      };

   
export  const EventType = 
      {
              //
        // Summary:
        //     Representa mensajes de información.
        Information : 0,
        //
        // Summary:
        //     Representa mensajes de advertencia.
        Warning : 1,
        //
        // Summary:
        //     Representa mensajes de error.
        Error : 2,
     
        //     Representa la ausencia de tipo de evento.
        Success : 4,
        
      }
      
export  const TipoParametroEnum = 
      {
        Especialidad : 500,
        Profesion : 100,
        EstadoCivil : 600,
        TipoDocumento : 601,
        TipoRecepcion : 200,
        TipoEventoMedico : 700,//antes tipo consulta
        TipoMedioContacto : 1000,
        Paises : 1050,
        Localidad : 1200,
        Provincia : 1100,
        AllergiesTypes : 10100,
        AllergiesItemTypes : 101012
      };



export const CommonValuesEnum =
    {
        TodosComboBoxValue : -1000,
        VariosComboBoxValue : -2000,
        SeleccioneUnaOpcion : -3000,
        Ninguno : -4000,
        /// <summary>
        /// Esta opcion es usada para seleccion de Mutuales .- Caso Sin mutual particular
        /// </summary>
        Particular : -5000
    };

    export const DayNamesIndex_Value_ES =[ 
        {"name" : 'Sabado' ,"index"  : 0,"bidValue": 1},
        {"name" : 'Viernes' ,"index"  : 1,"bidValue": 2 },
        {"name" : 'Jueves' ,"index"  : 2,"bidValue": 4 },
        {"name" : 'Miercoles' ,"index"  : 3,"bidValue": 8 },
        {"name" : 'Martes' ,"index"  : 4,"bidValue": 16 },
        {"name" : 'Lunes' ,"index"  : 5,"bidValue": 32 },
        {"name" : 'Domingo' ,"index"  : 6,"bidValue": 64 },
     ];

export const AppoimantsStatus_SP={
    Reservado : 630,
    EnAtencion : 631,
    Cerrado : 632,
    Cancelado : 633,
    Expirado : 634,
    EnEspera : 635,
    Libre : 636,
    Nulo : 637
}
export const AppoimantsStatus_SP_type=
{

    Entreturno : 638,
    Sobreturno : 639
}

  /// <summary>
    /// Estados de una subscripcion enviada para pertenecer a una institución
    /// </summary>
    export const SubscriptionRequestStatus=
    {
        EnEspera : 650,
        Rechazado : 651,
        Expirado : 652,
        Null : 653

    }
    export const DayNamesIndex_ES =
    {
        //SAB	VIE	JUE	MIE	MAR	LUN	DOM
        Sabado : 0,
        Viernes : 1,
        Jueves : 2,
        Miercoles : 3,
        Martes : 4,
        Lunes : 5,
        Domingo : 6
    }
    export const  WeekDays_EN =
    {

        Sunday : 1,

        Monday : 2,

        Tuesday : 4,

        Wednesday : 8,

        Thursday : 16,

        Friday : 32,
        //
        // Summary:
        //     Specifies work days (Monday, Tuesday, Wednesday, Thursday and Friday).
        WorkDays : 62,
        //
        // Summary:
        //     Specifies Saturday.
        Saturday : 64,
        //
        // Summary:
        //     Specifies Saturday and Sunday.
        WeekendDays : 65,
        //
        // Summary:
        //     Specifies every day of the week.
        EveryDay : 127
    }

     //
    // Summary:
    //     Specifies the day of the week c# System
   export const DayOfWeek=
    {
        Sunday : 0,
        Monday : 1,
        Tuesday : 2,
        Wednesday : 3,
        Thursday : 4,
        Friday : 5,
        Saturday : 6
    }

    export const MonthsShortName_ES=
    {
        ENE : 1,
        FEB : 2,
        MAR : 3,
        ABR : 4,
        MAY : 5,
        JUN : 6,
        JUL : 7,
        AGO : 8,
        SET : 9,
        OCT : 10,
        NOV : 11,
        DIC : 12

    }

    export const MonthsNames_ES=
    {
        Enero : 1,
        Febrero : 2,
        Marzo : 3, Abril : 4, Mayo : 5, Junio : 6, Julio : 7, Agosto : 8,
        Septiembre : 9,
        Octubre : 10,
        Noviembre : 11,
        Diciembre : 12

    }

export const CommonParams={
    TodosComboBoxValue:{
            IdParametro:-1000,
            Nombre:'Todos'
    },
    VariosComboBoxValue: {
        IdParametro:-2000,
        Nombre:'Varios'
},
    SeleccioneUnaOpcion : {
        IdParametro:-3000,
        Nombre:'Seleccione una opcion'
},
    Ninguno : {
        IdParametro:-4000,
        Nombre:'Ninguno'
            },
   
    Particular :  {
        IdParametro:-5000,
        Nombre:'Ninguno'
            }

};

export const MotivoConsultaEnum =
    {
        CrearPaciente: 0,
        ActualizarPaciente: 1,
        CrearProfesional: 2,
        ActualizarProfesional: 3,
        ConsultarPersona_NoUpdate: 4,
        /// <summary>
        /// Asocia a la institucion un profesional ya existente
        /// </summary>
        AsociateProfesional: 5,

    }

    export const TipoAlergia =
    {
        AnimalAllergy : 10104,
        ChemicalAllergy : 10108,
        FoodAllergy : 10103,
        InsectAllergy : 10106,
        MedicamentsAllergy : 10105,
        MiteAllergy : 10102,
        PollenAllergy : 10101,
        SunAllergy : 10107

    }
//module.exports =  HealtConstants;
//module.exports =  contextInfo;
// const  CNN_STRING_HEALTH  = {
//     user: 'sa',
//     password: 'as',
//     server: 'SANTANA\\SQLEXPRESS2008',
//     database: 'health3',

//     options: {
//         encrypt: true // Use this if you're on Windows Azure 
//     }
// }
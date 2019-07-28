import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { ServiceError } from "../model";



export  class helperFunctions {

  public   static   getPersonFullName( firstName:string,  lastName:string):string
     {
              if((lastName || lastName!='' ) && (firstName || firstName!='' ))
                 return lastName.trim(), ", ", firstName.trim();

             if((!lastName || lastName=='' ) && (firstName || firstName!='' ))
                 return firstName.trim();

              if((lastName || lastName=='' ) && (!firstName || firstName=='' ))
                 return lastName.trim();

             return '';
     }

  public static handleError(httpError: HttpErrorResponse | any) {
    console.log(httpError);

    let ex: ServiceError = new ServiceError();
    ex.Machine = 'PC-Desarrollo';
    // A client-side or network error occurred. Handle it accordingly.
    if (httpError.error instanceof ProgressEvent) {
      ex.Message = 'Client-side error occurred : ' + ex.Message  ; 


      if (ex.Message.includes('api/oauth/authenticate')) {
        ex.Message = ex.Message + ' Can not authenticate ';
      }
      if (httpError.status == 0) {
        ex.Message = ex.Message + ' verify your lan or internet connection.';
      }
      ex.Message = ex.Message + "\r\n" + httpError.message;
      ex.Status = httpError.status;
      return throwError(ex);
    }

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    if (httpError instanceof HttpErrorResponse) {
      //alert(error.error);
      ex.Status = httpError.status;
      if(ex.Status === 401){
        ex.Message = "No está autorizado para realizar esta acción";
        return throwError(ex);
      }
      if (httpError.error) {
        ex.Type =  httpError.error.ExceptionType || httpError.error.exceptionType;
        if(ex.Type){
          ex.Message  = httpError.error.ExceptionMessage || httpError.error.exceptionMessage;
          if (httpError.error.InnerException) {
            ex.Message = ex.Message + "\r\n" + httpError.error.ExceptionMessage || httpError.error.InnerException.exceptionMessage;
          }
        }
        else{
          ex.Message = httpError.error;
        }
 
        if(ex.Message || ex.Message.length != 0)
            return throwError(ex);
        //ex.Message  =  this.getMessageFrom_HttpErrorResponse(httpError);
        
      }

     
      if (httpError.message) {
        ex.Message = ex.Message + "\r\n" + httpError.message;
      }
      return throwError(ex);
    }


    ex.Message = httpError.message;

    return throwError(ex);

  }




  public static string_IsNullOrEmpty(str:string):boolean{
        if(!str || Object.keys(str.trim()).length === 0){
          return true;
        }
        return false;
      }
      /**
  * Gets Date from string
  * @param dateString
  * @returns the Date 
  */
 public static parseDate(dateString: string): Date {

    let f: Date;
    if (dateString) {
      f = new Date(dateString);

      return f;//new Date(dateString);
    } else {
      return null;
    }
}

private static getMessageFrom_HttpErrorResponse(httpError:HttpErrorResponse){
  
    let type =  httpError.error.ExceptionType || httpError.error.exceptionType;
    var message = httpError.error.ExceptionMessage || httpError.error.exceptionMessage;
    if(type){
        message  = httpError.error.ExceptionMessage || httpError.error.exceptionMessage;
        if (httpError.error.InnerException) {
            message = message + "\r\n" + httpError.error.ExceptionMessage || httpError.error.InnerException.exceptionMessage;
        }
      }
      else{
        message = httpError.error;
      }
    return message;
  }
}

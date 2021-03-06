

export class PersonBE {
   
     constructor(idPersona? : number ,nombre?:string){

        this.Nombre= nombre;
        this.IdPersona= idPersona;
    }
    

     IdPersona: number;
     UserId: string;
     TipoDocumento: string;
     NroDocumento: string;
     Apellido: string;
    Nombre: string;
     Sexo: number;  
     IdEstadocivil: number;
     FechaNacimiento?: Date;
     LastAccessTime: Date;
     LastAccessUserId: string;
     FechaAlta: Date;
     Foto: ArrayBuffer;
     IsUserActive: boolean ;
    //  Street: string;
    //  StreetNumber: number;
     Floor: string;
    //  CountryId: number;
    //  ProvinceId: number;
    //  CityId: number;
     //Neighborhood: string;
    //  mail: string;
    //  Telefono1: string;
    //  Telefono2: string;
    //  Province: string;
    //  City: string;
    //  ZipCode: string;
     LastHealthInstId: string ;


     public ApellidoNombre():string
     {
        return PersonBE.getFullName( this.Apellido , this.Nombre);
     }
    public   static   getFullName( firstName:string,  lastName:string):string
     {
              if((lastName || lastName!='' ) && (firstName || firstName!='' ))
                 return lastName.trim(), ", ", firstName.trim();

             if((!lastName || lastName=='' ) && (firstName || firstName!='' ))
                 return firstName.trim();

              if((lastName || lastName=='' ) && (!firstName || firstName=='' ))
                 return lastName.trim();

             return '';
     }

    places:PlaceBE[];
}

export class PlaceBE{
    adr_address:string;
    formatted_address:string;
    id:string;
    place_id:string;
    Street: string;
    StreetNumber: number;
    mail: string;
    Telefono1: string;
    Telefono2: string;
    Floor: string;
}
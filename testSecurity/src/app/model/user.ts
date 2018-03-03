export class User
{

   public email: string;
   public userName: string;
   public password: string;
}

export class  Session{

        public profile :User;
        public expires_at : any;
        public token : string;

}
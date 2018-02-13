 export class Post
{
   public  userId: number;
   public id: number;
   public title: string;
   public body: string;
}

export class Comment
{
    public  postId: number; 
   
   public id: number;
   public name: string;
   public email: string;
   public body: string;
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import  'rxjs/add/operator/map';
import {NewsBE,HealtConstants, childrenList,childrenBE, resultRedditNews} from '../../app/models';
import {  HttpClient } from '@angular/common/http';

@IonicPage({name:'p2',segment:'p-2'})
@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {

  public newsList: childrenBE[] = [];
  
  public defaultImg: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL24woWmytp2XdstksagUYcMF5wBhuIwCHqA90ztNeC9fUr_-L';
  PermitirDuplicados:Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
    this.PermitirDuplicados = false;
  }

  setDefaultPic() {
  return this.defaultImg;
  }
  retriveNews():void{


    let news$ = this.http.get('https://www.reddit.com/new/.json', HealtConstants.httpClientOption_contenttype_json);
    news$.subscribe(res=>{
      
      let result:resultRedditNews = res as  resultRedditNews;
    if(result.data)
      this.newsList = result.data.children;
      
    });
  }
}

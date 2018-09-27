import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { NewsBE, HealtConstants, childrenList, childrenBE, resultRedditNews, ServiceError } from '../../app/models';
import { HttpClient } from '@angular/common/http';
import { resolveDefinition } from '@angular/core/src/view/util';



@IonicPage({ name: 'p2', segment: 'p-2' })
@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page {

  public duration: any;
  public newsList: childrenBE[] = [];

  public defaultImg: string = 'https://pbs.twimg.com/profile_images/769630931279831044/3TwP4PBb.jpg';
  PermitirDuplicados: Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
    this.PermitirDuplicados = false;

    
    
  }
 
  ///Esta es otra forma de llamar al scroll infinito
  doInfinite(): Promise<any> {
    console.log('Begin async infiniteScroll operation -->(Promise)');

      var param2 = {};
      param2['after'] = '';
      if (this.newsList.length > 0) {
        param2['after'] = this.newsList[this.newsList.length - 1].data.name;
      }
      var url = 'https://www.reddit.com/new/.json?before=' + param2['after'];
      let news$ =  this.http.get(url, HealtConstants.httpClientOption_contenttype_json);
      console.log('calling ' + url); 
      return new Promise<any>((resolve) => {

        setTimeout(() => {

          
          news$.subscribe(res => {
             this.maping_date(res);
            });
          
          console.log('Async operation has ended -->(Promise)');
          resolve();
        }, 500);     
        
     
      });



  }

  ///Esta puede ser una de las formas
  doInfinite2(infiniteScroll) {
    console.log('Begin async infiniteScroll operation');

    setTimeout(() => {

      var param2 = {};

      if (this.newsList.length > 0) {
        param2['after'] = this.newsList[this.newsList.length - 1].data.name;
      }
      var url = 'https://www.reddit.com/new/.json?before=' + param2['after'];
      let news$ = this.http.get('https://www.reddit.com/new/.json?before = ' + param2['after'], HealtConstants.httpClientOption_contenttype_json);

      console.log('llamando a ' + url);
      news$.subscribe(res => {

        this.maping_date(res);

      });

      console.log('Async infiniteScroll operation has ended');
      infiniteScroll.complete();
    }, 500);





  }




  updateUrl() {
    return this.defaultImg;
  };

  retriveNews(): void {

    let news$ = this.http.get('https://www.reddit.com/new/.json', HealtConstants.httpClientOption_contenttype_json);
    news$.subscribe(res => {

      this.maping_date(res);

    });
  }

  maping_date(res): void {

    let result: resultRedditNews = res as resultRedditNews;
    if (result.data) {
      result.data.children.forEach(element => {
        if (!element.data.thumbnail || element.data.thumbnail === undefined) {
          element.data.thumbnail = this.defaultImg;
        }
        if (element.data.thumbnail === 'self' || element.data.thumbnail === 'default') {
          element.data.thumbnail = this.defaultImg;
        }

        this.newsList = result.data.children;
        console.log('Async infiniteScroll operation has ended');

      });
    }

  }

  public handleError(error: Response | any) {

    console.log('-------------------Error---------------------');
    console.log(error);
    console.log(error.status);
    console.log(error.message);
    console.log('----------------------------------------');

    let ex: ServiceError = new ServiceError();
    ex.Message = 'Despachador de servicio no responde .-';
    ex.Status= error.status;
    if(error.statusText){
      ex.Message = ex.Message + "\r\n" + error.statusText;
    }
    if(error._body){
      ex.Message = ex.Message + "\r\n" + error._body;
    }

    if(error.message){
      ex.Message = ex.Message + "\r\n" + error.message;
    }
   

    ex.Machine = 'PC-Desarrollo-Santana';

    return Observable.throw(ex); // <= B
  }
}

import { Component } from '@angular/core';
import { ModalDialogComponent } from './common-components/modal-dialog/modal-dialog.component';

import { DialogService } from "ng2-bootstrap-modal";
import { CommonService, AuthenticationService } from "./service/index";

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    mainComponentTitle:string;
    
    title = 'app works!';

    constructor(private dialogService: DialogService,
        private commonService :CommonService,
        private router: Router, 
        private authService: AuthenticationService
        //private idle: Idle, private keepalive: Keepalive
        ) { 

        //Escrive el titulo en e l header prinsipal del dasboard
        this.commonService.get_mainComponentTitle$().subscribe(d => {
            if(d){
                this.mainComponentTitle = d;
            }
        });
    }
    


    showConfirm() {
        let disposable = this.dialogService.addDialog(ModalDialogComponent, {
            title: 'Confirm title',
            message: 'Confirm message'
        })
            .subscribe((isConfirmed) => {
                //We get dialog result
                if (isConfirmed) {
                    alert('accepted');
                }
                else {
                    alert('declined');
                }
            });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        // setTimeout(()=>{
        //     disposable.unsubscribe();
        // },10000);
    }
}

import { Component } from '@angular/core';
import { ModalDialogComponent } from './common-components/modal-dialog/modal-dialog.component';

import { DialogService } from "ng2-bootstrap-modal";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private dialogService: DialogService) { }
    title = 'app works!';


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

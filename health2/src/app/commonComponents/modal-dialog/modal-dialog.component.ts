import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})

export class ModalDialogComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

// export class ModelDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

 
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
  
}

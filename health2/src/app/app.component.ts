import { Component } from '@angular/core';
import { ModalDialogComponent } from './common-components/modal-dialog/modal-dialog.component';
import { DialogService } from "ng2-bootstrap-modal";
import { CommonService, AuthenticationService } from "./service/index";
import { Router } from '@angular/router';
import { Keepalive } from '@ng-idle/keepalive';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { AppConstants } from './model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public mainComponentTitle: string;

    //public title = 'app works!';
    public idleState = 'NotStarted';
    public idleStateMessage = 'Not started';
    
    public timedOut = false;
    public lastPing?: Date = null;





    constructor(private dialogService: DialogService,
        private commonService: CommonService,
        private router: Router,
        private authService: AuthenticationService,
        private idle: Idle, private keepalive: Keepalive
    ) {
            //detecto inicio session
        this.authService.logingChange_subject$.subscribe((res) => {
            //inicio el countdown para el patron user idle
            if (res === true) {
            this.reset();
            }

        });
        //Escribe el titulo en e l header prinsipal del dasboard
        this.commonService.get_mainComponentTitle$().subscribe(tittle => {
            if (tittle) {
                this.mainComponentTitle = tittle;
            }
        });
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(AppConstants.iddleTimeout_seconds);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(AppConstants.iddle_waite_Timeout_seconds);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        //enent -> Ya no está inactivo
        idle.onIdleEnd.subscribe(() => this.idleState = 'NoLongerIdle');

        idle.onTimeout.subscribe(() => {
            this.idleState = 'TimedOut';
            this.timedOut = true;
            if (this.authService.isAuth() === true) {
                this.authService.signOut();
                this.router.navigate(['/login']);
            }
        });

        //inicio de inactividad
        idle.onIdleStart.subscribe(
            () => {
               //'You\'ve gone idle!
                this.idleState = 'Inactivo'
            });
     //Estera estando inactivo 
    idle.onTimeoutWarning.subscribe((countdown) => 
            this.idleStateMessage = 'Su sessión expirará por inactividad  en ' + countdown + ' segundos!'
       );
        

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.reset();

        
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started';
        this.idleStateMessage = "Started";
        this.timedOut = false;
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

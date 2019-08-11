import { Component } from '@angular/core';
import { ModalDialogComponent } from './common-components/modal-dialog/modal-dialog.component';
import { DialogService } from "ng2-bootstrap-modal";
import { CommonService, AuthenticationService } from "./service/index";
import { Router } from '@angular/router';
import { Keepalive } from '@ng-idle/keepalive';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public mainComponentTitle: string;

    public title = 'app works!';
    public idleState = 'Not started.';
    public timedOut = false;
    public lastPing?: Date = null;

    //idle timeout of 5 
    public iddleTimeout_seconds = 3600;

    //period of time in seconds. after 10 seconds of inactivity, the user will be considered timed out.
    public iddle_waite_Timeout_seconds = 5;


    constructor(private dialogService: DialogService,
        private commonService: CommonService,
        private router: Router,
        private authService: AuthenticationService,
        private idle: Idle, private keepalive: Keepalive
    ) {

        //Escrive el titulo en e l header prinsipal del dasboard
        this.commonService.get_mainComponentTitle$().subscribe(d => {
            if (d) {
                this.mainComponentTitle = d;
            }
        });
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(this.iddleTimeout_seconds);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(this.iddle_waite_Timeout_seconds);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        //enent -> Ya no está inactivo
        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

        idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            if (this.authService.isAuth() === true) {
                this.authService.signOut();
                this.router.navigate(['/login']);
            }
        });

        //inicio de inactividad
        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');

        //Estera estando inactivo 
        idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.reset();

        if (this.authService.isAuth() === false) {
            console.log('cheuqueando auttenticacion en app componet');
            this.authService.signOut();
            this.router.navigate(['/login']);
        }
        //else{
            //console.log('Esta autenticado ' , this.authService.getCurrenLoging().currentUser.UserName);
            //console.log('foto ' , this.authService.get_currentProfesionalData().Profesional.Persona.Foto);
        //}
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
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

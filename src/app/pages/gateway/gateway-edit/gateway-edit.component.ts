import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {from, Observable, of, Subject} from "rxjs";
import {mapTo, mergeAll, switchMap, tap} from "rxjs/operators";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
    selector: 'app-gateway-edit',
    templateUrl: './gateway-edit.component.html',
    styleUrls: ['./gateway-edit.component.scss']
})
export class GatewayEditComponent implements OnInit, OnDestroy {

    //page
    title: string;
    actionMode = 'create';

    //icons
    icSave = faSave;
    icSpinner = faSpinner;

    // form
    name = '';
    serial = '';
    ip = '';

    // flags
    formError = false;

    // async
    gatewaySubject$ = new Subject();
    loading$?: Observable<boolean>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly appService: AppService,
        private readonly gatewayController: GatewayControllerService
    ) {
        this.title = activatedRoute.snapshot.data.name;
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.actionMode = String(activatedRoute.snapshot.data.path).includes('create') ? 'create' : 'edit';
    }

    ngOnInit(): void {
        const newGateway = this.gatewaySubject$.pipe(
            tap((mode) => console.log('Action mode: ', mode)),
            switchMap((mode) => {
                if (!this.isFormValid()) { // Invalid form
                    // Invalid form
                    this.formError = true;
                    console.log('Invalid form!');
                    return of(false);
                } else { // Valid form
                    console.log('Valid form!');
                    if (mode == 'create') {
                        this.gatewayController.createGateway({
                            body: {
                                name: this.name,
                                serial: this.serial,
                                ipv4: this.ip
                            }
                        }).subscribe(
                            response => {
                                console.log('Created...')
                                console.log(response);
                                this.router.navigateByUrl('/').then();
                            },
                            error => {
                                console.log(error);
                                this.formError = true;
                            }
                        );
                        return of(false);
                    } else {
                        return of(false);
                    }
                }

            })
        );

        this.loading$ = from([newGateway, this.gatewaySubject$.pipe(mapTo(false))]).pipe(mergeAll());

    }

    submit = () => {
        if (this.isFormValid()) {
            this.formError = false;
            this.gatewaySubject$.next(this.actionMode);
        } else {
            this.formError = true
        }
    }

    isFormValid = () => (
        this.name.trim().length != 0 &&
        this.serial.trim().length != 0 &&
        this.ip.trim().length != 0 &&
        !!this.ip.match('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'));

    ngOnDestroy() {
    }
}

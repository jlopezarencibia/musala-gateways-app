import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {from, Observable, of, Subject} from "rxjs";
import {mapTo, mergeAll, switchMap} from "rxjs/operators";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {Location} from "@angular/common";

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
    id = -1;
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
        private readonly appService: AppService,
        private readonly gatewayController: GatewayControllerService,
        private readonly location: Location
    ) {
        this.title = activatedRoute.snapshot.data.name;
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.actionMode = String(activatedRoute.snapshot.data.path).includes('create') ? 'create' : 'update';
    }

    ngOnInit(): void {
        if (this.actionMode == 'update') {
            this.id = this.activatedRoute.snapshot.params.id;
            this.gatewayController.findGatewayById({id: this.id}).subscribe(
                result => {
                    this.name = result.name!;
                    this.ip = result.ipv4!;
                    this.serial = result.serial!;
                },
                () => {
                    this.location.back();
                }
            )
        }
        const newGateway = this.gatewaySubject$.pipe(
            switchMap((mode) => {
                if (!this.isFormValid()) { // Invalid form
                    // Invalid form
                    this.formError = true;
                    return of(false);
                } else { // Valid form
                    if (mode == 'create') {
                        this.gatewayController.createGateway({
                            body: {
                                name: this.name,
                                serial: this.serial,
                                ipv4: this.ip
                            }
                        }).subscribe(
                            () => {
                                this.location.back();
                            },
                            () => {
                                this.formError = true;
                            }
                        );
                        return of(false);
                    } else {
                        this.gatewayController.updateGateway({
                            id: this.id, body: {
                                name: this.name,
                                serial: this.serial,
                                ipv4: this.ip
                            }
                        }).subscribe(
                            () => {
                                this.location.back();
                            },
                            () => {
                                this.formError = true;
                            }
                        )
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

    goBack = () => {
        this.location.back();
    }
    ngOnDestroy() {
    }
}

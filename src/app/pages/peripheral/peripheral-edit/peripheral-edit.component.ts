import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {from, Observable, of, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {Location} from "@angular/common";
import {mapTo, mergeAll, switchMap, tap} from "rxjs/operators";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {PeripheralControllerService} from "../../../api/services/peripheral-controller.service";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {Gateway} from "../../../api/models/gateway";

@AutoUnsubscribe()
@Component({
    selector: 'app-peripheral-edit',
    templateUrl: './peripheral-edit.component.html',
    styleUrls: ['./peripheral-edit.component.scss']
})
export class PeripheralEditComponent implements OnInit, OnDestroy {

    //page
    title: string;
    actionMode = 'create';

    //icons
    icSave = faSave;
    icSpinner = faSpinner;

    // form
    id = -1;
    vendor = '';
    uid = '';
    gatewayId = -1;

    // flags
    formError = false;

    // async
    peripheralSubject$ = new Subject();
    gateways$: Observable<Gateway[]>;
    loading$?: Observable<boolean>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService,
        private readonly peripheralController: PeripheralControllerService,
        private readonly gatewayController: GatewayControllerService,
        private readonly location: Location
    ) {
        this.title = activatedRoute.snapshot.data.name;
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.actionMode = String(activatedRoute.snapshot.data.path).includes('create') ? 'create' : 'update';
        this.gateways$ = this.gatewayController.getGatewaysPaged({
            options: {
                page: 0,
                pageSize: 999,
                sortDirection: 'ASC',
                sortBy: 'name'
            }
        })
    }

    ngOnInit(): void {
        console.log(this.actionMode)
        if (this.actionMode == 'update') {
            this.id = this.activatedRoute.snapshot.params.id;
            this.peripheralController.findPeripheralById({id: this.id}).subscribe(
                result => {
                    this.vendor = result.vendor!;
                    this.uid = result.uid! + '';
                    this.gatewayId = result.gateway!.id!
                },
                error => {
                    this.location.back();
                }
            )
        }
        const newPeripheral = this.peripheralSubject$.pipe(
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
                        this.peripheralController.createPeripheral({
                            body: {
                                vendor: this.vendor,
                                uid: +this.uid,
                                gatewayId: this.gatewayId
                            }
                        }).subscribe(
                            response => {
                                console.log('Created...')
                                console.log(response);
                                this.location.back();
                            },
                            error => {
                                console.log(error);
                                this.formError = true;
                            }
                        );
                        return of(false);
                    } else {
                        this.peripheralController.updatePeripheral({
                            id: this.id,
                            body: {
                                vendor: this.vendor,
                                uid: +this.uid,
                                gatewayId: this.gatewayId
                            }
                        }).subscribe(
                            response => {
                                console.log('Updated...');
                                console.log(response);
                                this.location.back();
                            },
                            error => {
                                console.log(error);
                                this.formError = true;
                            }
                        )
                        return of(false);
                    }
                }

            })
        );

        this.loading$ = from([newPeripheral, this.peripheralSubject$.pipe(mapTo(false))]).pipe(mergeAll());

    }

    submit = () => {
        if (this.isFormValid()) {
            this.formError = false;
            this.peripheralSubject$.next(this.actionMode);
        } else {
            this.formError = true
        }
    }

    isFormValid = () => {
        return (
            this.gatewayId >= 0 &&
            this.vendor.trim().length != 0 &&
            this.uid != null
        )
    };

    goBack = () => {
        this.location.back();
    }

    ngOnDestroy() {
    }

}

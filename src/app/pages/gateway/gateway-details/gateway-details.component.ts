import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {GatewayControllerService} from "../../../api/services";
import {Observable} from "rxjs";
import {Gateway} from "../../../api/models/gateway";
import {Peripheral} from "../../../api/models/peripheral";
import {faArrowLeft, faEdit, faMicrochip, faNetworkWired, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Location} from "@angular/common";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
    selector: 'app-gateway-details',
    templateUrl: './gateway-details.component.html',
    styleUrls: ['./gateway-details.component.scss']
})
export class GatewayDetailsComponent implements OnInit, OnDestroy {

    // async
    gateway$?: Observable<Gateway>;
    peripherals$?: Observable<Peripheral[]>;

    // icons
    icGateway = faNetworkWired;
    icPeripheral = faMicrochip;
    icBack = faArrowLeft;
    icEdit = faEdit;
    icDelete = faTrashAlt;

    // page
    title: string;
    needConfirm = false;

    // input
    confirmed = false;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly gatewayController: GatewayControllerService,
        private readonly appService: AppService,
        private readonly location: Location
    ) {
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.title = activatedRoute.snapshot.data.name;

        const id = activatedRoute.snapshot.params.id;

        this.gateway$ = this.gatewayController.findGatewayById({id});
        this.peripherals$ = this.gatewayController.getPeripherals({id});
    }

    ngOnInit(): void {
    }

    goBack = () => { this.location.back()}

    delete = (id: number) => {
        if (this.confirmed) {
            this.gatewayController.deleteGateway({id}).subscribe(
                () => {
                    this.location.back();
                }
            )
        } else {
            this.needConfirm = true;
        }
    }

    ngOnDestroy() {
    }

}

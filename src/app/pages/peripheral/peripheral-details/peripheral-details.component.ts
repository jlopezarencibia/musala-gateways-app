import {Component, OnDestroy, OnInit} from '@angular/core';
import {faArrowLeft, faEdit, faMicrochip, faNetworkWired, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {Location} from "@angular/common";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {Gateway} from "../../../api/models/gateway";
import {Peripheral} from "../../../api/models/peripheral";
import {PeripheralControllerService} from "../../../api/services/peripheral-controller.service";

@AutoUnsubscribe()
@Component({
    selector: 'app-peripheral-details',
    templateUrl: './peripheral-details.component.html',
    styleUrls: ['./peripheral-details.component.scss']
})
export class PeripheralDetailsComponent implements OnInit, OnDestroy {

    // async
    peripheral$?: Observable<Peripheral>;

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
        private readonly peripheralController: PeripheralControllerService,
        private readonly appService: AppService,
        private readonly location: Location
    ) {
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.title = activatedRoute.snapshot.data.name;
        const id = activatedRoute.snapshot.params.id;
        this.peripheral$ = this.peripheralController.findPeripheralById({id});
    }

    ngOnInit(): void {
    }

    goBack = () => {
        this.location.back()
    }

    delete = (id: number) => {
        if (this.confirmed) {
            this.peripheralController.deletePeripheral({id}).subscribe(
                response => {
                    console.log('Deleted...');
                    console.log(response);
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

import {Component, OnInit} from '@angular/core';
import {faNetworkWired, faPlus} from "@fortawesome/free-solid-svg-icons";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-gateway-list',
    templateUrl: './gateway-list.component.html',
    styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit {

    //icons
    icLogo = faNetworkWired;
    icPlus = faPlus;

    //page
    depth: number;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly gatewayController: GatewayControllerService,
        private readonly appService: AppService
    ) {
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.depth = activatedRoute.snapshot.data.depth;
    }

    ngOnInit(): void {
    }

}

import {Component, OnInit} from '@angular/core';
import {faMicrochip, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {AppService} from "../../../services/app.service";

@Component({
    selector: 'app-peripheral-list',
    templateUrl: './peripheral-list.component.html',
    styleUrls: ['./peripheral-list.component.scss']
})
export class PeripheralListComponent implements OnInit {

    //icons
    icLogo = faMicrochip;
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
        console.log(activatedRoute.snapshot.data.path)
    }

    ngOnInit(): void {
    }

}

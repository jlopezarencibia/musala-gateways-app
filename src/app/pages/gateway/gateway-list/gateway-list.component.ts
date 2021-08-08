import {Component, OnDestroy, OnInit} from '@angular/core';
import {faChevronRight, faNetworkWired, faPlus} from "@fortawesome/free-solid-svg-icons";
import {GatewayControllerService} from "../../../api/services/gateway-controller.service";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {Gateway} from "../../../api/models/gateway";
import {mapTo, mergeAll, switchMap, tap} from "rxjs/operators";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
    selector: 'app-gateway-list',
    templateUrl: './gateway-list.component.html',
    styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit, OnDestroy {

    //icons
    icChevRight = faChevronRight;
    icPlus = faPlus;

    //page
    depth: number;
    title: string;
    page = 1;
    sortBy = 'ipv4';
    pageSize = 2;
    sortDirection = 'ASC';

    // async
    gatewaySubject$ = new BehaviorSubject(this.sortBy);
    gateways$?: Observable<Gateway[]>;
    loading$: Observable<boolean>;
    count$: Observable<number>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly gatewayController: GatewayControllerService,
        private readonly appService: AppService
    ) {
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.depth = activatedRoute.snapshot.data.depth;
        this.title = activatedRoute.snapshot.data.name;

        const fetch = this.gatewaySubject$.pipe(
            tap(() => console.log('Fetching...')),
            switchMap((sortBy) => {
                this.gateways$ = this.gatewayController.getGatewaysPaged({
                    options: {
                        page: this.page -1,
                        sortBy,
                        pageSize: this.pageSize,
                        sortDirection: this.sortDirection
                    }
                })
                return of(false);
            })
        )
        this.count$ = this.gatewayController.gatewayCount();

        this.loading$ = from([fetch, this.count$.pipe(mapTo(false)), this.gatewaySubject$.pipe(mapTo(false))]).pipe(mergeAll());
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }

    switchPage = () => this.gatewaySubject$.next(this.sortBy);

}

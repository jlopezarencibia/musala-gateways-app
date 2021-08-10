import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
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
    icPlus = faPlus;

    //page
    title: string;
    page = 1;
    sortBy = 'name';
    pageSize = 8;
    sortDirection = 'ASC';
    sortOption: 'nameAsc' | 'nameDesc' | 'ipAsc' | 'ipDesc' = 'nameAsc';

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
        this.title = activatedRoute.snapshot.data.name;

        const fetch = this.gatewaySubject$.pipe(
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

    doSort = () => {
        switch (this.sortOption) {
            case 'nameAsc': {
                this.sortBy = 'name';
                this.sortDirection = 'ASC';
                break;
            }
            case 'nameDesc': {
                this.sortBy = 'name';
                this.sortDirection = 'DESC';
                break;
            }
            case 'ipAsc': {
                this.sortBy = 'ipv4';
                this.sortDirection = 'ASC';
                break;
            }
            case 'ipDesc': {
                this.sortBy = 'ipv4';
                this.sortDirection = 'DESC';
                break;
            }
        }
        this.gatewaySubject$.next(this.sortBy);
    }

}

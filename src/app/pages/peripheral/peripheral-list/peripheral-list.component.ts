import {Component, OnDestroy, OnInit} from '@angular/core';
import {faMicrochip, faNetworkWired, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {Peripheral} from "../../../api/models/peripheral";
import {mapTo, mergeAll, switchMap, tap} from "rxjs/operators";
import {PeripheralControllerService} from "../../../api/services/peripheral-controller.service";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
    selector: 'app-peripheral-list',
    templateUrl: './peripheral-list.component.html',
    styleUrls: ['./peripheral-list.component.scss']
})
export class PeripheralListComponent implements OnInit, OnDestroy {

    //icons
    icGateway = faNetworkWired;
    icMicro = faMicrochip;
    icPlus = faPlus;

    //page
    title: string;
    page = 1;
    sortBy = 'creationDate';
    pageSize = 8;
    sortDirection = 'DESC';
    sortOption: 'vendorAsc' | 'vendorDesc' | 'dateAsc' | 'dateDesc' = 'dateDesc';

    // async
    peripheralSubject$ = new BehaviorSubject(this.sortBy);
    peripheral$?: Observable<Peripheral[]>
    loading$: Observable<boolean>;
    count$: Observable<number>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly peripheralController: PeripheralControllerService,
        private readonly appService: AppService
    ) {
        this.appService.setPath(activatedRoute.snapshot.data.path);
        this.title = activatedRoute.snapshot.data.name;

        const fetch = this.peripheralSubject$.pipe(
            tap(() => console.log('Fetching...')),
            switchMap((sortBy) => {
                this.peripheral$ = this.peripheralController.getPeripheralsPaged({
                    options: {
                        page: this.page - 1,
                        sortBy,
                        pageSize: this.pageSize,
                        sortDirection: this.sortDirection
                    }
                })
                return of(false);
            })
        );

        this.count$ = this.peripheralController.peripheralCount();

        this.loading$ = from([fetch, this.count$.pipe(mapTo(false)), this.peripheralSubject$.pipe(mapTo(false))]).pipe(mergeAll());
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }

    switchPage = () => this.peripheralSubject$.next(this.sortBy);

    doSort = () => {
        switch (this.sortOption) {
            case 'dateAsc': {
                this.sortBy = 'creationDate';
                this.sortDirection = 'ASC';
                break;
            }
            case 'dateDesc': {
                this.sortBy = 'creationDate';
                this.sortDirection = 'DESC';
                break;
            }
            case 'vendorAsc': {
                this.sortBy = 'vendor';
                this.sortDirection = 'ASC';
                break;
            }
            case 'vendorDesc': {
                this.sortBy = 'vendor';
                this.sortDirection = 'DESC';
                break;
            }
        }
        this.peripheralSubject$.next(this.sortBy);
    }

}

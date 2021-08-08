import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    path = new BehaviorSubject('');

    /**
     * Sets the current path
     *
     * @param pathSegment the path segment
     * */
    setPath(pathSegment: string) {
        this.path.next(pathSegment);
    }

    constructor() {
    }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PxiLoaderService {

    public spinnerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

    public constructor() { }

    public show() {
        this.spinnerSubject.next(true);
    }
    
    public hide() {
        this.spinnerSubject.next(false);
    }

    public getMessage(): Observable<any> {
        return this.spinnerSubject.asObservable();
    }
}

import { Injectable } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    isActive: Boolean = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, time: number = 3, keepAfterNavigationChange = false) {
        if (!this.isActive) {
            this.keepAfterNavigationChange = keepAfterNavigationChange;
            this.subject.next({ type: 'success', text: message });
            this.isActive = true;
            this.hide(time);

        }
    }

    error(message: string, time: number = 3, keepAfterNavigationChange = false) {
        if (!this.isActive) {
            this.keepAfterNavigationChange = keepAfterNavigationChange;
            this.subject.next({ type: 'error', text: message });
            this.isActive = true;
            this.hide(time);

        }
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    hide(sec: number) {
        const aliveTime = timer(1000 * sec); // 5000 millisecond means 5 seconds
        aliveTime.subscribe(() => {
            this.subject.next();
            this.isActive = false;
        });
    }
}

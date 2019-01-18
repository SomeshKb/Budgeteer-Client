import { Injectable } from '@angular/core';
import { Subject, AsyncSubject } from 'rxjs';
import { LoaderState } from '../../models/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
    // this.loaderSubject.complete();
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}

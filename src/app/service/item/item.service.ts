import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { ItemDetails } from 'src/app/models/item';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  public currentItem: Subject<ItemDetails[]> = new Subject<ItemDetails[]>();

  private eventUrl = 'api/event';

  constructor(private http: HttpClient) { }

  //  GET events from the server
  getItems(): Observable<ItemDetails[]> {
    const url: string = this.eventUrl + '/all';
    return this.http.get<ItemDetails[]>(url)
      .pipe(catchError(this.handleError));
  }

  // GET event using id from server
  getItem(id: string): Observable<ItemDetails> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.get<ItemDetails>(url)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

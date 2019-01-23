import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { BudgetDetails } from 'src/app/models/budget';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../user/authentication.service';
import { environment } from '../../../environments/environment';
import { AlertService } from '../shared/alert.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {


  public currentBudget: Subject<BudgetDetails[]> = new Subject<BudgetDetails[]>();

  private budgetUrl = environment.baseUrl + '/budgets';

  constructor(private http: HttpClient, private auth: AuthenticationService, private alertService: AlertService) { }

  //  GET budget from the server
  getBudgets(): Observable<BudgetDetails[]> {
    const url: string = this.budgetUrl + '/all';
    return this.http.get<BudgetDetails[]>(url, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
      .pipe(catchError(this.handleError));
  }

  // GET budget using id from server
  getBudget(id: string): Observable<BudgetDetails> {
    const url = `${this.budgetUrl}/${id}`;
    return this.http.get<BudgetDetails>(url, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
      .pipe(catchError(this.handleError));
  }

  postBudget(budgetDetails: any) {
    const url = `${this.budgetUrl}/add`;
    return this.http.post(url, budgetDetails, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
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
    this.alertService.error(errorMessage);
    return throwError(errorMessage);
  }
}

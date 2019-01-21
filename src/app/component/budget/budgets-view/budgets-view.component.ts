import { Component, OnInit } from '@angular/core';
import { BudgetDetails } from 'src/app/models/budget';
import { AuthenticationService } from 'src/app/service/user/authentication.service';
import { BudgetService } from '../../../service/budget/budget.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-budgets-view',
  templateUrl: './budgets-view.component.html',
  styleUrls: ['./budgets-view.component.css']
})
export class BudgetsViewComponent implements OnInit {

  budgets: BudgetDetails[];
  isSettled = false;
  pastBudgets: BudgetDetails[];
  upComingBudgets: BudgetDetails[];

  constructor(private auth: AuthenticationService, private budgetService: BudgetService) {
    if (auth.isLoggedIn()) {
      auth.isUserLoggedIn.next(true);
    }
    this.budgetService.currentBudget.subscribe(budgets => {
      this.checkForSettledBudget(budgets);
      this.isSettled = false;
      this.togglePastButton();
    });
    // this.ui.darkModeState.subscribe((value) => {
    //   this.darkModeActive = value;
    // });
  }

  ngOnInit() {
    this.budgetService.getBudgets().subscribe(budgets => {
      this.budgetService.currentBudget.next(budgets);
      console.log(budgets);
    });
  }

  togglePastButton() {
    if (this.isSettled) {
      this.budgets = this.pastBudgets;
    } else {
      this.budgets = this.upComingBudgets;
    }
    this.isSettled = !this.isSettled;
  }

  checkForSettledBudget(budgets: BudgetDetails[]) {
    this.pastBudgets = [];
    this.upComingBudgets = [];

    budgets.map(budget => {

      if (budget.hasSettled) {
        this.pastBudgets.push(budget);
        console.log('past ');

      } else {
        this.upComingBudgets.push(budget);
        console.log('upcoming ');
      }
    });
  }

  getBuyerName(id) {
    this.auth.getUserName(id).subscribe(value => {
      return value;
    });
  }

}

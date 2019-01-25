import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../service/budget/budget.service';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { BudgetDetails } from '../../../models/budget';
import { UserProfile } from '../../../models/user';
import { tap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  settledBudget: BudgetDetails[] = [];
  notSettledBudget: BudgetDetails[] = [];
  expensesPerUser: number[] = [];
  contributorDetails: UserProfile[] = [];
  isSettled = true;
  totalSpend: number[] = [];

  constructor(private budgetService: BudgetService, private auth: AuthenticationService) {
    if (auth.isLoggedIn()) {
      auth.isUserLoggedIn.next(true);
    }
  }

  ngOnInit() {
    this.budgetService.getBudgets().subscribe(res => {
      res.map(x => {
        if (x.hasSettled) {
          this.settledBudget.push(x);
        } else {
          this.notSettledBudget.push(x);
        }
      });
      this.toggleBudget();
    });
  }


  calculateBudget(budget: BudgetDetails[]) {
    let totalSum: number;
    totalSum = 0;
    const contributors = this.getUniqueContributors(budget);
    this.getContributorDetails(contributors);
    this.expensesPerUser.length = contributors.length;
    this.totalSpend.length = contributors.length;
    this.expensesPerUser.fill(0);
    this.totalSpend.fill(0);

    budget.map(x => {

      const cost = x.cost / x.contributors.length;
      x.contributors.map(uid => {
        contributors.map((id, index) => {
          if (uid === id) {
            this.expensesPerUser[index] = this.expensesPerUser[index] + cost;
          }
          if (id === x.buyer) {
            this.totalSpend[index] = this.totalSpend[index] + x.cost;
          }
        });
      });
    });

    console.log(this.totalSpend);

  }

  getUniqueContributors(budget: BudgetDetails[]) {
    const contributors: any[] = [];
    if (budget.length > 0) {
      budget.map(x => {
        x.contributors.map(y => {
          if (contributors.indexOf(y) === -1) {
            contributors.push(y);
          }
        });
      });
    }
    return contributors;
  }


  getContributorDetails(contributor: any[]) {
    this.contributorDetails.length = contributor.length;
    contributor.map((contributorID, index) => {
      this.auth.getUserName(contributorID).subscribe(x => {
        this.contributorDetails[index] = x;
      });
    });

  }

  findDetails(id: string) {
    const b = this.contributorDetails.filter((item) => item._id === id).shift();
    return b;

  }

  toggleBudget() {
    this.expensesPerUser = [];
    this.contributorDetails = [];
    this.isSettled = !this.isSettled;
    if (this.isSettled) {
      this.calculateBudget(this.settledBudget);
    } else {
      this.calculateBudget(this.notSettledBudget);
    }
  }

  aleradyPaid() {

  }

}

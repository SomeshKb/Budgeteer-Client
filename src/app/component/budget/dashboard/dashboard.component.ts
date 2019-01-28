import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../service/budget/budget.service';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { BudgetDetails } from '../../../models/budget';
import { UserProfile } from '../../../models/user';

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
  statement: string[] = [];

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
    const contributors = this.getUniqueContributors(budget);
    this.getContributorDetails(contributors);
    this.expensesPerUser.length = contributors.length;
    this.totalSpend.length = contributors.length;
    this.expensesPerUser.fill(0);
    this.totalSpend.fill(0);

    budget.map((x, i) => {
      let counter = 0;
      const cost = x.cost / x.contributors.length;
      x.contributors.map(uid => {
        contributors.map((id, index) => {
          if (uid === id) {
            this.expensesPerUser[index] = this.expensesPerUser[index] + cost;
          }
          if (counter === 0 && id === x.buyer) {
            this.totalSpend[index] = this.totalSpend[index] + x.cost;
            counter = 1;
          }
        });
      });
    });
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
        if (this.contributorDetails[contributor.length - 1] !== undefined) {
        }
      });
    });


  }

  findDetails(id: string) {
    const details = this.contributorDetails.filter((item) => item._id === id).shift();
    return details;

  }

  async toggleBudget() {
    this.expensesPerUser = [];
    this.contributorDetails = [];
    this.isSettled = !this.isSettled;
    if (this.isSettled) {
      this.calculateBudget(this.settledBudget);
    } else {
      this.calculateBudget(this.notSettledBudget);

    }
  }



  manageBudget(): any[] {
    const dueBalance: any[] = [];
    dueBalance.length = this.expensesPerUser.length;
    this.expensesPerUser.forEach((value, index) => {
      dueBalance[index] = this.totalSpend[index] - this.expensesPerUser[index];
    });

    dueBalance.forEach((value, i) => {
      if (value < 0) {
        dueBalance.forEach((expense, j) => {
          if (expense > 0) {
            if (dueBalance[j] < Math.abs(dueBalance[i])) {
              dueBalance[i] = dueBalance[j] + dueBalance[i];

              this.statement.push(this.contributorDetails[i].firstName + ' will give '
                + Math.abs(dueBalance[j]).toFixed(2) + ' to ' + this.contributorDetails[j].firstName);
              dueBalance[j] = 0;
            } else {
              dueBalance[j] = dueBalance[j] + dueBalance[i];
              this.statement.push(this.contributorDetails[i].firstName + ' will give '
                + Math.abs(dueBalance[i]).toFixed(2) + ' to ' + this.contributorDetails[j].firstName);
              dueBalance[i] = 0;
            }
          }
        });
      }
    });
    return dueBalance;
  }

}

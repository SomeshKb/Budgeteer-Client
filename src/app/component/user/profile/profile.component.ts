import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { UserDetails } from '../../../models/user';
import { BudgetDetails } from '../../../models/budget';
import { BudgetService } from '../../../service/budget/budget.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: UserDetails;
  publishedBudget: BudgetDetails[] = [];
  contributors = [];

  constructor(private auth: AuthenticationService, private budgetService: BudgetService) {
    if (this.auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }

  ngOnInit() {
    this.auth.profile().subscribe(res => {
      this.userDetails = res;
      res.budgetBuyer.map((id, index) => {
        this.budgetService.getBudget(id).subscribe(budget => {
          this.publishedBudget.push(budget);
          this.contributors[index] = [];
          budget.contributors.map(userId => {
            // console.log(userId);
            this.auth.getUserName(userId).subscribe(user => {
              this.contributors[index].push(user);
            });
          });
        });
      });

    });
  }

  getContributorName(id): string {
    this.auth.getUserName(id).subscribe(res => {
      return res;
    });
    return;
  }


}

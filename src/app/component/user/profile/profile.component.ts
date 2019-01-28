import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { UserDetails, UserProfile } from '../../../models/user';
import { BudgetDetails } from '../../../models/budget';
import { BudgetService } from '../../../service/budget/budget.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: UserProfile;
  publishedBudget: BudgetDetails[] = [];
  contributors = [];
  isOpenBudget: Boolean = true;

  constructor(private auth: AuthenticationService, private budgetService: BudgetService) {
    if (this.auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }

  ngOnInit() {
    this.auth.profile().subscribe(res => {
      this.userDetails = res;
      this.getUserBudget(this.userDetails);
    });
  }

  getUserBudget(userBudget: UserProfile) {
    userBudget.budgetBuyer.map((id, index) => {
      this.budgetService.getBudget(id).subscribe(budget => {
        this.publishedBudget.push(budget);
        this.contributors[index] = [];
        budget.contributors.map(userId => {
          this.auth.getUserName(userId).subscribe(user => {
            this.contributors[index].push(user);
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
  budgetSettled(id) {
    this.budgetService.hasSettled(id, true).subscribe(res => {
      this.publishedBudget = [];
      this.getUserBudget(this.userDetails);
    });
    console.log(this.publishedBudget);
    console.log(this.contributors);
  }

  toggleBudget() {
    this.isOpenBudget = !this.isOpenBudget;
  }

}

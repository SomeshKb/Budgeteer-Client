import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { BudgetsViewComponent } from './component/budget/budgets-view/budgets-view.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { BudgetDetailComponent } from './component/budget/budget-detail/budget-detail.component';
import { AuthGuardService } from './service/user/auth-guard.service';
import { AddBudgetComponent } from './component/budget/add-budget/add-budget.component';
import { ProfileComponent } from './component/user/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: BudgetsViewComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: ProfileComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'budget/add', component: AddBudgetComponent },
  { path: 'budget/:id', component: BudgetDetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

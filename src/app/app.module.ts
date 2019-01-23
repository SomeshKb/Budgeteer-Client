import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { BudgetsViewComponent } from './component/budget/budgets-view/budgets-view.component';
import { BudgetDetailComponent } from './component/budget/budget-detail/budget-detail.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { AlertComponent } from './component/shared/alert/alert.component';
import { AuthenticationService } from './service/user/authentication.service';
import { AlertService } from './service/shared/alert.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptorService } from './service/shared/loader-interceptor.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuardService } from './service/user/auth-guard.service';
import { AddBudgetComponent } from './component/budget/add-budget/add-budget.component';
import { LoaderComponent } from './component/shared/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './component/user/profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BudgetsViewComponent,
    BudgetDetailComponent,
    AddBudgetComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    AlertComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthenticationService, AlertService, AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ], bootstrap: [AppComponent]
})
export class AppModule { }

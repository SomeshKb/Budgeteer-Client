import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { ItemsViewComponent } from './component/item/items-view/items-view.component';
import { ItemDetailComponent } from './component/item/item-detail/item-detail.component';
import { AddItemComponent } from './component/item/add-item/add-item.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ItemsViewComponent,
    ItemDetailComponent,
    AddItemComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, AlertService, AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ], bootstrap: [AppComponent]
})
export class AppModule { }

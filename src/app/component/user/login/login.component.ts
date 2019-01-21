import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../../models/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../service/shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  submitted = false;
  user: UserDetails;

  loginForm: FormGroup;


  constructor(private alertService: AlertService, private auth: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.login(this.loginForm.value);
    }
  }

  login(credentials: any) {
    this.auth.login(credentials)
      .subscribe(() => {
        this.auth.isUserLoggedIn.next(true);
        console.log('Done');
        this.router.navigateByUrl('/home');
      }, (err) => {
        if (err.status === 400) {
          this.alertService.error('Invalid Credentials !!');
        }
      });
  }


  getDetails() {
    this.user = this.auth.getUserDetails();
  }

}

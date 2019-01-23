import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/shared/alert.service';
import { AuthenticationService } from 'src/app/service/user/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private alertService: AlertService, private auth: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.register(this.registerForm.value);
    }
  }

  register(credentials: any) {
    this.auth.register(credentials).subscribe((res) => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      if (err.status === 409) {
        this.alertService.error('User Already Exists !!');
      }
    });
  }




}

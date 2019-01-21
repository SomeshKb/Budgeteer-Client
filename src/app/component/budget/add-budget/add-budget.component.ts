import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../service/budget/budget.service';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { AlertService } from '../../../service/shared/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {

  submitted: Boolean = false;
  createForm: FormGroup = null;
  budgetTypes: String[] = [];
  darkModeActive: Boolean = false;

  constructor(private auth: AuthenticationService, private alertService: AlertService,
    private budgetService: BudgetService, private formBuilder: FormBuilder) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
    }
  }

  ngOnInit() {
    // this.ui.darkModeState.subscribe((value) => {
    //   this.darkModeActive = value;
    // });

    this.createForm = this.formBuilder.group({
      shortDescription: ['', [Validators.required, Validators.maxLength(30)]],
      totalSeats: [, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required]],
      items: [],
      description: null,
      totalCost: [0, Validators.required],
      buyer: this.auth.getUserDetails()._id,
      contributors: [],
    });


  }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      console.log(this.createForm);
      return;
    } else {
      console.log(this.createForm.value);

      this.budgetService.postBudget(this.createForm).subscribe(res => {
        this.submitted = false;
        this.alertService.success('Budget Details Added');
        this.createForm.reset();
      });
    }
  }

  get validate() { return this.createForm.controls; }

}

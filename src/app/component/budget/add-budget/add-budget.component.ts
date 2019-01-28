import { Component, OnInit, ɵConsole } from '@angular/core';
import { BudgetService } from '../../../service/budget/budget.service';
import { AuthenticationService } from '../../../service/user/authentication.service';
import { AlertService } from '../../../service/shared/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from '../../../models/user';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {

  submitted: Boolean = false;
  createForm: FormGroup = null;
  contributors: UserDetails[] = [];
  darkModeActive: Boolean = false;
  selectedContributor: string[] = [];
  userID = null;

  constructor(private auth: AuthenticationService, private alertService: AlertService,
    private budgetService: BudgetService, private formBuilder: FormBuilder) {
    if (auth.isLoggedIn()) {
      this.auth.isUserLoggedIn.next(true);
      this.auth.profile().subscribe(response => {
        this.userID = response.id;
      });
    }
  }

  ngOnInit() {
    // this.ui.darkModeState.subscribe((value) => {
    //   this.darkModeActive = value;
    // });

    this.auth.allProfileName().subscribe(res => {
      this.contributors = res;
    });

    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: null,
      cost: [0, Validators.required],
      buyer: null,
      contributors: [],
    });


  }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    } else {
      this.createForm.controls['contributors'].setValue(this.selectedContributor);
      this.createForm.controls['buyer'].setValue(this.userID);

      console.log(this.createForm.value);
      this.budgetService.postBudget(this.createForm.value).subscribe(res => {
        this.submitted = false;
        this.alertService.success('Budget Details Added');
        this.createForm.reset();
        this.selectedContributor = [];
      });
    }
  }

  get validate() { return this.createForm.controls; }

  onCheckChange(event) {
    if (event.target.checked) {
      this.selectedContributor.push(event.target.defaultValue);
    } else {
      this.selectedContributor = this.selectedContributor.filter(x => {
        return x !== event.target.value;
      });
    }
    console.log(this.selectedContributor);
  }

}

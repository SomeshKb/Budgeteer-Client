import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/service/shared/ui.service';
import { AuthenticationService } from 'src/app/service/user/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: UserDetails;
  isUserLoggedIn: boolean;
  darkModeActive: Boolean = false;
  showMenu: Boolean = false;


  constructor(private route: ActivatedRoute, private ui: UiService,
    private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.isUserLoggedIn.subscribe(value => {
      this.user = this.authenticationService.getUserDetails();
      this.isUserLoggedIn = value;
    });
  }

  ngOnInit() {
    this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  getAllData() {
    // this.eventService.getEvents().subscribe(budget => {
    //   this.eventService.currentEvent.next(budget);
    // });
    if (this.route.snapshot.fragment !== '/home') {
      this.router.navigate(['/home']);
    }
  }


  logoutUser() {
    this.authenticationService.isUserLoggedIn.next(false);
    this.authenticationService.logout();
    if (this.showMenu) {
      this.toggleMenu();
    }
  }
}

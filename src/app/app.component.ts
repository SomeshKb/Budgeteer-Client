import { Component, OnInit } from '@angular/core';
import { UiService } from './service/shared/ui.service';
import { LoaderService } from './service/shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'EventManagement';
  isLoading: Boolean = false;
  darkModeActive: Boolean = false;
  constructor(private loaderService: LoaderService, private ui: UiService) { }

  ngOnInit() {
    this.loaderService.loaderState.subscribe(currentState => {
      this.isLoading = currentState.show;
    });
    this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }


}

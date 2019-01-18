import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../service/shared/alert.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [

      state('in', style({ opacity: 1 })),

      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      transition(':leave',
        animate(300, style({ opacity: 0 })))
    ])
  ]

})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsViewComponent } from './budgets-view.component';

describe('BudgetsViewComponent', () => {
  let component: BudgetsViewComponent;
  let fixture: ComponentFixture<BudgetsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCheckOutComponent } from './subscription-check-out.component';

describe('SubscriptionCheckOutComponent', () => {
  let component: SubscriptionCheckOutComponent;
  let fixture: ComponentFixture<SubscriptionCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCheckOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

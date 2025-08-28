import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDisplay } from './order-display';

describe('OrderDisplay', () => {
  let component: OrderDisplay;
  let fixture: ComponentFixture<OrderDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

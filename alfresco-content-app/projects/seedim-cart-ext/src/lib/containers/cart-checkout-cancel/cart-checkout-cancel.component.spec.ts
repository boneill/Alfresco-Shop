import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutCancelComponent } from './cart-checkout-cancel.component';

describe('CartCheckoutCancelComponent', () => {
  let component: CartCheckoutCancelComponent;
  let fixture: ComponentFixture<CartCheckoutCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckoutCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckoutCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

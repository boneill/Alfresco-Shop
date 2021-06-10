import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckoutSuccessComponent } from './cart-checkout-success.component';

describe('CartCheckoutSuccessComponent', () => {
  let component: CartCheckoutSuccessComponent;
  let fixture: ComponentFixture<CartCheckoutSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckoutSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckoutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

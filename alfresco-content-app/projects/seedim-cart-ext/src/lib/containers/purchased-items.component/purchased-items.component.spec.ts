import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedItemsComponent } from './purchased-items.component';

describe('PurchasedItemsComponent', () => {
  let component: PurchasedItemsComponent;
  let fixture: ComponentFixture<PurchasedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

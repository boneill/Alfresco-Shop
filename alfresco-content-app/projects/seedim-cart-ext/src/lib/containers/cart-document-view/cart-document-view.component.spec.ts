import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDocumentViewComponent } from './cart-document-view.component';

describe('CartDocumentViewComponent', () => {
  let component: CartDocumentViewComponent;
  let fixture: ComponentFixture<CartDocumentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDocumentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

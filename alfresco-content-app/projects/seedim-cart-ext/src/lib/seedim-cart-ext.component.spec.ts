import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedimCartExtComponent } from './seedim-cart-ext.component';

describe('SeedimCartExtComponent', () => {
  let component: SeedimCartExtComponent;
  let fixture: ComponentFixture<SeedimCartExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedimCartExtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedimCartExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

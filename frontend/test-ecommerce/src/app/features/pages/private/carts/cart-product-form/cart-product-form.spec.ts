import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductForm } from './cart-product-form';

describe('CartProductForm', () => {
  let component: CartProductForm;
  let fixture: ComponentFixture<CartProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProductForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

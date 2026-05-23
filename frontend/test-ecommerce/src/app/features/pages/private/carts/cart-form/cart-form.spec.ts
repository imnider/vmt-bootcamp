import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartForm } from './cart-form';

describe('CartForm', () => {
  let component: CartForm;
  let fixture: ComponentFixture<CartForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CartForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
